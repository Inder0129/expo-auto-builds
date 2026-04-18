import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/src/store/hooks';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { CartItem } from '@/src/components/cart/cart-item';
import { PriceSummary } from '@/src/components/cart/price-summary';
import { CheckoutButton } from '@/src/components/cart/checkout-button';
import { EmptyCart } from '@/src/components/cart/empty-cart';
import styles from '@/src/styles/cart';

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
  const cartTotal = useAppSelector((state: any) => state.cart.total);

  const deliveryFee = 2.99;
  const taxRate = 0.08;

  const taxAmount = useMemo(() => {
    return cartTotal * taxRate;
  }, [cartTotal]);

  const orderTotal = useMemo(() => {
    return cartTotal + deliveryFee + taxAmount;
  }, [cartTotal, deliveryFee, taxAmount]);

  const handleCheckout = useCallback(() => {
    router.push('/checkout');
  }, [router]);

  const handleContinueShopping = useCallback(() => {
    router.push('/(tabs)/explore');
  }, [router]);

  if (cartItems.length === 0) {
    return <EmptyCart onContinueShopping={handleContinueShopping} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>My Cart</Text>
        
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
          />
        ))}
        
        <PriceSummary 
          subtotal={cartTotal}
          deliveryFee={deliveryFee}
          taxAmount={taxAmount}
          total={orderTotal}
        />
      </ScrollView>
      
      <View style={styles.footer}>
        <CheckoutButton 
          total={orderTotal}
          itemCount={cartItems.length}
          onPress={handleCheckout}
        />
      </View>
    </View>
  );
}
