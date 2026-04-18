import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch } from '@/src/store/hooks';
import { clearCart, removeItem, addItem } from '@/src/store/slices/cart';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import { CartItem } from '@/src/components/cart/cart-item';
import styles from '@/src/styles/cart';

interface CartItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId: string;
  restaurantName: string;
}

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
          onPress: () => dispatch(removeItem(itemId))
        }
      ]
    );
  }, [dispatch]);

  const handleUpdateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    const item = cartItems.find((item: CartItemType) => item.id === itemId);
    if (item) {
      dispatch(addItem({ ...item, quantity }));
    }
  }, [dispatch, handleRemoveItem, cartItems]);

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
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: colors.textSecondary, marginBottom: 16 }}>Your cart is empty</Text>
          <Button title="Browse Restaurants" onPress={() => router.push('/(tabs)/explore')} />
        </View>
      </View>
    );
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
            onPress={handleClearCart}
            style={{ paddingHorizontal: 12, paddingVertical: 6 }}
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

        <View style={{ backgroundColor: colors.surface, borderRadius: 8, padding: spacing.md, margin: spacing.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
            <Text style={{ ...typography.body, color: colors.textSecondary }}>Subtotal</Text>
            <Text style={{ ...typography.body, color: colors.textPrimary }}>${priceSummary.subtotal.toFixed(2)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
            <Text style={{ ...typography.body, color: colors.textSecondary }}>Delivery Fee</Text>
            <Text style={{ ...typography.body, color: colors.textPrimary }}>${priceSummary.deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md }}>
            <Text style={{ ...typography.body, color: colors.textSecondary }}>Tax</Text>
            <Text style={{ ...typography.body, color: colors.textPrimary }}>${priceSummary.tax.toFixed(2)}</Text>
          </View>
          <View style={{ height: 1, backgroundColor: colors.border, marginVertical: spacing.md }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ ...typography.subtitle, color: colors.textPrimary }}>Total</Text>
            <Text style={{ ...typography.heading, color: colors.primary }}>${priceSummary.total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ ...typography.caption, color: colors.textSecondary }}>Total</Text>
            <Text style={{ ...typography.heading, color: colors.primary }}>${priceSummary.total.toFixed(2)}</Text>
          </View>
          <Button
            title={`Checkout (${cartItems.length} items)`}
            onPress={handleCheckout}
            style={{ flex: 2, marginLeft: spacing.md }}
          />
        </View>
      </View>
    </View>
  );
}
