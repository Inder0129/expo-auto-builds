import React, { useCallback, useState, useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, typography } from '@/src/theme';
import { CartItem } from '@/src/components/cart/cart-item';
import { PriceBreakdown } from '@/src/components/cart/price-breakdown';
import { DeliveryAddress } from '@/src/components/cart/delivery-address';
import { CheckoutButton } from '@/src/components/cart/checkout-button';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import styles from '@/src/styles/cart';

interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    { id: '1', name: 'Margherita Pizza', price: 12.99, quantity: 1, imageUrl: '' },
    { id: '2', name: 'Garlic Bread', price: 5.99, quantity: 2, imageUrl: '' },
    { id: '3', name: 'Caesar Salad', price: 8.99, quantity: 1, imageUrl: '' },
  ]);

  const deliveryAddress = {
    id: '1',
    name: 'Home',
    address: '123 Main St, City, State 12345',
    isDefault: true,
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum: number, item: CartItemType) => sum + (item.price * item.quantity), 0);
  }, [cartItems]);

  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const handleUpdateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) {
      setCartItems((prev: CartItemType[]) => prev.filter((item: CartItemType) => item.id !== itemId));
      return;
    }
    setCartItems((prev: CartItemType[]) =>
      prev.map((item: CartItemType) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }, []);

  const handleRemoveItem = useCallback((itemId: string) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          setCartItems((prev: CartItemType[]) => prev.filter((item: CartItemType) => item.id !== itemId));
        },
      },
    ]);
  }, []);

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Add items to checkout.');
      return;
    }
    router.push('/checkout');
  }, [cartItems.length, router]);

  const handleChangeAddress = useCallback(() => {
    router.push('/addresses');
  }, [router]);

  const handleContinueShopping = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Shopping Cart</Text>

        {cartItems.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
            <Button title="Browse Restaurants" onPress={handleContinueShopping} style={styles.emptyButton} />
          </Card>
        ) : (
          <>
            <Card style={styles.itemsCard}>
              {cartItems.map((item: CartItemType) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  imageUrl={item.imageUrl}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </Card>

            <DeliveryAddress
              name={deliveryAddress.name}
              address={deliveryAddress.address}
              onChange={handleChangeAddress}
            />

            <PriceBreakdown
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              tax={tax}
              total={total}
            />
          </>
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <CheckoutButton
          itemCount={cartItems.reduce((sum: number, item: CartItemType) => sum + item.quantity, 0)}
          totalPrice={total}
          onCheckout={handleCheckout}
        />
      )}
    </View>
  );
}
