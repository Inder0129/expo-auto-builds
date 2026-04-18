import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch } from '@/src/store/hooks';
import { CartItem } from '@/src/components/cart/cart-item';
import { PriceSummary } from '@/src/components/cart/price-summary';
import { CheckoutButton } from '@/src/components/cart/checkout-button';
import { EmptyCart } from '@/src/components/cart/empty-cart';
import { colors, spacing, typography } from '@/src/theme';
import styles from '@/src/styles/cart';

type CartItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId: string;
};

export default function CartScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: any) => state.cart.items);

  const handleItemQuantityChange = useCallback((itemId: string, newQuantity: number) => {
    // Dispatch action to update quantity
  }, [dispatch]);

  const handleRemoveItem = useCallback((itemId: string) => {
    // Dispatch action to remove item
  }, [dispatch]);

  const handleCheckout = useCallback(() => {
    router.push('/(modals)/checkout');
  }, [router]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum: number, item: CartItemType) => sum + (item.price * item.quantity), 0);
  }, [cartItems]);

  const deliveryFee = 40;
  const tax = totalPrice * 0.05;
  const grandTotal = totalPrice + deliveryFee + tax;

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.itemsContainer} contentContainerStyle={styles.itemsContentContainer}>
        {cartItems.map((item: CartItemType) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={(newQuantity: number) => handleItemQuantityChange(item.id, newQuantity)}
            onRemove={() => handleRemoveItem(item.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.summaryContainer}>
        <PriceSummary
          subtotal={totalPrice}
          deliveryFee={deliveryFee}
          tax={tax}
          grandTotal={grandTotal}
        />
        <CheckoutButton
          onPress={handleCheckout}
          disabled={cartItems.length === 0}
          style={styles.checkoutButton}
        />
      </View>
    </View>
  );
}
