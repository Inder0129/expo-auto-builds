import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { CartItem } from '@/src/components/cart/cart-item';
import { PriceSummary } from '@/src/components/cart/price-summary';
import { CouponInput } from '@/src/components/cart/coupon-input';
import { Button } from '@/src/components/ui/button';
import { colors, spacing, typography } from '@/src/theme';
import { cartStyles } from '@/src/styles/cart';

type CartItemType = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  maxQuantity: number;
};

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    { id: '1', name: 'Wireless Headphones', price: 89.99, originalPrice: 129.99, image: 'https://picsum.photos/200/200', quantity: 1, maxQuantity: 5 },
    { id: '2', name: 'Smart Watch Series 5', price: 299.99, image: 'https://picsum.photos/200/201', quantity: 1, maxQuantity: 3 },
    { id: '3', name: 'Organic Cotton T-Shirt', price: 24.99, image: 'https://picsum.photos/200/202', quantity: 2, maxQuantity: 10 },
  ]);

  const [couponCode, setCouponCode] = useState<string>('');
  const [couponApplied, setCouponApplied] = useState<boolean>(false);

  const handleQuantityChange = useCallback((itemId: string, newQuantity: number) => {
    setCartItems((prevItems: CartItemType[]) =>
      prevItems.map((item: CartItemType) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  const handleRemoveItem = useCallback((itemId: string) => {
    setCartItems((prevItems: CartItemType[]) =>
      prevItems.filter((item: CartItemType) => item.id !== itemId)
    );
  }, []);

  const handleApplyCoupon = useCallback((code: string) => {
    console.log('Applying coupon:', code);
    setCouponApplied(true);
    setCouponCode(code);
  }, []);

  const handleRemoveCoupon = useCallback(() => {
    setCouponApplied(false);
    setCouponCode('');
  }, []);

  const handleCheckout = useCallback(() => {
    console.log('Proceeding to checkout');
  }, []);

  const handleContinueShopping = useCallback(() => {
    console.log('Continue shopping');
  }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum: number, item: CartItemType) => sum + (item.price * item.quantity), 0);
  }, [cartItems]);

  const discount = useMemo(() => {
    return couponApplied ? subtotal * 0.1 : 0;
  }, [subtotal, couponApplied]);

  const shipping = useMemo(() => {
    return subtotal > 50 ? 0 : 5.99;
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal - discount + shipping;
  }, [subtotal, discount, shipping]);

  if (cartItems.length === 0) {
    return (
      <View style={cartStyles.emptyContainer}>
        <Text style={cartStyles.emptyTitle}>Your cart is empty</Text>
        <Text style={cartStyles.emptySubtitle}>Add items to get started</Text>
        <Button
          title="Continue Shopping"
          onPress={handleContinueShopping}
          style={cartStyles.continueButton}
        />
      </View>
    );
  }

  return (
    <ScrollView style={cartStyles.container} showsVerticalScrollIndicator={false}>
      <View style={cartStyles.header}>
        <Text style={cartStyles.title}>Shopping Cart</Text>
        <Text style={cartStyles.itemCount}>{cartItems.length} items</Text>
      </View>

      <View style={cartStyles.itemsSection}>
        {cartItems.map((item: CartItemType) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={(newQuantity: number) => handleQuantityChange(item.id, newQuantity)}
            onRemove={() => handleRemoveItem(item.id)}
            style={cartStyles.cartItem}
          />
        ))}
      </View>

      <View style={cartStyles.section}>
        <CouponInput
          value={couponCode}
          onChangeText={setCouponCode}
          onApply={handleApplyCoupon}
          onRemove={handleRemoveCoupon}
          applied={couponApplied}
        />
      </View>

      <View style={cartStyles.section}>
        <PriceSummary
          subtotal={subtotal}
          discount={discount}
          shipping={shipping}
          total={total}
        />
      </View>

      <View style={cartStyles.checkoutSection}>
        <Button
          title="Proceed to Checkout"
          onPress={handleCheckout}
          style={cartStyles.checkoutButton}
        />
        <Button
          title="Continue Shopping"
          variant="outline"
          onPress={handleContinueShopping}
          style={cartStyles.continueButton}
        />
      </View>
    </ScrollView>
  );
}
