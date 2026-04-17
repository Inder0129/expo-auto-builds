import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '@/src/store/slices/cart';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import { CartItem } from '@/src/components/cart/cart-item';
import { PriceSummary } from '@/src/components/cart/price-summary';
import { CheckoutButton } from '@/src/components/cart/checkout-button';
import { styles } from '@/src/styles/cart';

type CartItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
};

export default function CartScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: any) => state.cart.items);
  const restaurantId = useMemo(() => {
    return cartItems.length > 0 ? cartItems[0].restaurantId : null;
  }, [cartItems]);

  const handleRemoveItem = useCallback((itemId: string) => {
    dispatch(removeFromCart(itemId));
  }, [dispatch]);

  const handleUpdateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(itemId);
    } else {
      dispatch(updateQuantity({ id: itemId, quantity }));
    }
  }, [dispatch, handleRemoveItem]);

  const handleClearCart = useCallback(() => {
    Alert.alert('Clear Cart', 'Remove all items from cart?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        style: 'destructive',
        onPress: () => dispatch(clearCart()),
      },
    ]);
  }, [dispatch]);

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      Alert.alert('Cart Empty', 'Add items to cart before checkout');
      return;
    }
    router.push('/checkout');
  }, [cartItems.length, router]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((total: number, item: CartItemType) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptyText}>Add items from restaurants to get started</Text>
        <Button title="Browse Restaurants" onPress={() => router.push('/(tabs)/explore')} style={styles.emptyButton} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.restaurantName}>{cartItems[0]?.restaurantName || 'Restaurant'}</Text>
          <Button title="Clear All" variant="text" onPress={handleClearCart} />
        </View>

        {cartItems.map((item: CartItemType) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onRemove={() => handleRemoveItem(item.id)}
            onUpdateQuantity={(quantity: number) => handleUpdateQuantity(item.id, quantity)}
          />
        ))}

        <PriceSummary
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          tax={tax}
          total={total}
        />
      </ScrollView>

      <CheckoutButton total={total} onPress={handleCheckout} />
    </View>
  );
}
