import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CartItemCard } from '@/src/components/cart/cart-item-card';
import { PriceBreakdown } from '@/src/components/cart/price-breakdown';
import { CheckoutButton } from '@/src/components/cart/checkout-button';
import { styles } from '@/src/styles/cart';

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartScreen() {
  const router = useRouter();

  const cartItems: CartItem[] = useMemo(() => [
    {
      id: '1',
      name: 'Margherita Pizza',
      description: 'Classic pizza with tomato sauce, mozzarella, and basil',
      price: 12.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
    },
    {
      id: '2',
      name: 'Garlic Bread',
      description: 'Toasted bread with garlic butter and herbs',
      price: 5.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c',
    },
    {
      id: '3',
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with Caesar dressing and croutons',
      price: 8.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1',
    },
  ], []);

  const handleQuantityChange = useCallback((itemId: string, newQuantity: number) => {
    // In a real app, this would update state/context
    console.log(`Item ${itemId} quantity changed to ${newQuantity}`);
  }, []);

  const handleRemoveItem = useCallback((itemId: string) => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => console.log(`Item ${itemId} removed`),
      },
    ]);
  }, []);

  const handleCheckout = useCallback(() => {
    Alert.alert('Checkout', 'Proceeding to checkout...');
    // In a real app, this would navigate to checkout screen
  }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Your Cart</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyCart}>
            <Ionicons name="cart-outline" size={64} color="#ccc" />
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
            <Text style={styles.emptyCartSubtext}>Add items from restaurants to get started</Text>
            <TouchableOpacity
              style={styles.browseButton}
              onPress={() => router.push('/(tabs)/explore')}
            >
              <Text style={styles.browseButtonText}>Browse Restaurants</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {cartItems.map((item: CartItem) => (
              <CartItemCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                quantity={item.quantity}
                image={item.image}
                onQuantityChange={(newQuantity: number) =>
                  handleQuantityChange(item.id, newQuantity)
                }
                onRemove={() => handleRemoveItem(item.id)}
                style={styles.cartItem}
              />
            ))}

            <PriceBreakdown
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              tax={tax}
              total={total}
              style={styles.priceBreakdown}
            />

            <View style={styles.promoSection}>
              <TouchableOpacity style={styles.promoButton}>
                <Ionicons name="gift" size={20} color="#ff6b35" />
                <Text style={styles.promoButtonText}>Add Promo Code</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <CheckoutButton
          total={total}
          itemCount={cartItems.length}
          onPress={handleCheckout}
          style={styles.checkoutButton}
        />
      )}
    </SafeAreaView>
  );
}