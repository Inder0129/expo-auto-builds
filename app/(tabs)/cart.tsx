import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch } from '@/src/store/hooks';
import { CartItem } from '@/src/components/cart/cart-item';
import { PriceSummary } from '@/src/components/cart/price-summary';
import { CheckoutButton } from '@/src/components/cart/checkout-button';
import { EmptyCart } from '@/src/components/cart/empty-cart';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';
import { styles } from '@/src/styles/cart';

type CartItemType = {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId: string;
  restaurantName: string;
};

export default function CartScreen() {
  const router = useRouter();
  const cartItems = useAppSelector((state: any) => state.cart.items);
  const dispatch = useAppDispatch();
  
  const handleQuantityChange = useCallback((itemId: string, newQuantity: number) => {
    // Dispatch action to update quantity
  }, [dispatch]);
  
  const handleRemoveItem = useCallback((itemId: string) => {
    // Dispatch action to remove item
  }, [dispatch]);
  
  const handleCheckout = useCallback(() => {
    router.push('/checkout');
  }, [router]);
  
  const handleContinueShopping = useCallback(() => {
    router.push('/(tabs)/explore');
  }, [router]);
  
  const totalItems = useMemo(() => {
    return cartItems.reduce((sum: number, item: CartItemType) => sum + item.quantity, 0);
  }, [cartItems]);
  
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum: number, item: CartItemType) => sum + (item.price * item.quantity), 0);
  }, [cartItems]);
  
  const deliveryFee = 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;
  
  if (cartItems.length === 0) {
    return <EmptyCart onContinueShopping={handleContinueShopping} />;
  }
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.cartTitle}>Your Cart ({totalItems} items)</Text>
        
        {cartItems.map((item: CartItemType) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            quantity={item.quantity}
            image={item.image}
            restaurantName={item.restaurantName}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemoveItem}
          />
        ))}
      </ScrollView>
      
      <View style={styles.summaryContainer}>
        <PriceSummary
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          tax={tax}
          total={total}
        />
        <CheckoutButton
          total={total}
          itemCount={totalItems}
          onPress={handleCheckout}
        />
      </View>
    </View>
  );
}
