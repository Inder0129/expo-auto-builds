import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch } from '@/src/store/hooks';
import { clearCart, removeFromCart, updateQuantity } from '@/src/store/slices/cart';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
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
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: any) => state.cart.items);
  const cartTotal = useAppSelector((state: any) => state.cart.total);

  const handleRemoveItem = useCallback((itemId: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => dispatch(removeFromCart(itemId))
        }
      ]
    );
  }, [dispatch]);

  const handleUpdateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    dispatch(updateQuantity({ id: itemId, quantity }));
  }, [dispatch, handleRemoveItem]);

  const handleClearCart = useCallback(() => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to clear all items from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: () => dispatch(clearCart())
        }
      ]
    );
  }, [dispatch]);

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) {
      Alert.alert('Your cart is empty');
      return;
    }
    router.push('/checkout');
  }, [cartItems.length, router]);

  const deliveryFee = 2.99;
  const tax = cartTotal * 0.08;
  const orderTotal = cartTotal + deliveryFee + tax;

  const priceSummary = useMemo(() => ({
    subtotal: cartTotal,
    deliveryFee,
    tax,
    total: orderTotal
  }), [cartTotal, deliveryFee, tax, orderTotal]);

  if (cartItems.length === 0) {
    return <EmptyCart onBrowseRestaurants={() => router.push('/(tabs)/explore')} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.itemsContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Your Cart</Text>
          <Button 
            title="Clear All" 
            variant="text" 
            size="small"
            onPress={handleClearCart}
          />
        </View>

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
            onRemove={() => handleRemoveItem(item.id)}
            onUpdateQuantity={(quantity: number) => handleUpdateQuantity(item.id, quantity)}
          />
        ))}

        <PriceSummary 
          subtotal={priceSummary.subtotal}
          deliveryFee={priceSummary.deliveryFee}
          tax={priceSummary.tax}
          total={priceSummary.total}
        />
      </ScrollView>

      <View style={styles.footer}>
        <CheckoutButton 
          total={priceSummary.total}
          itemCount={cartItems.length}
          onPress={handleCheckout}
        />
      </View>
    </View>
  );
}
