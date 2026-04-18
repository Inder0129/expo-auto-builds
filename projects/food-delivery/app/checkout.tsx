import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/src/components/ui';
import { PaymentMethodSelector } from '@/src/components/checkout/payment-method-selector';
import { AddressForm } from '@/src/components/checkout/address-form';
import { OrderSummary } from '@/src/components/checkout/order-summary';
import { useAppSelector } from '@/src/store/hooks';
import { colors, spacing, typography } from '@/src/theme';
import { checkoutStyles } from '@/src/styles/checkout';

interface CheckoutScreenProps {}

type PaymentMethod = 'card' | 'upi' | 'cash';

interface AddressData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

export default function CheckoutScreen(props: CheckoutScreenProps) {
  const router = useRouter();
  const cart = useAppSelector((state: any) => state.cart);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('card');
  const [address, setAddress] = useState<AddressData>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const totalAmount = useMemo((): number => {
    return cart.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  }, [cart.items]);

  const handlePaymentMethodSelect = useCallback((method: PaymentMethod): void => {
    setSelectedPaymentMethod(method);
  }, []);

  const handleAddressChange = useCallback((field: keyof AddressData, value: string): void => {
    setAddress(prev => ({ ...prev, [field]: value }));
  }, []);

  const handlePlaceOrder = useCallback((): void => {
    if (!address.street || !address.city || !address.phone) {
      Alert.alert('Error', 'Please fill in all required address fields');
      return;
    }
    
    Alert.alert('Success', 'Your order has been placed!');
    router.push('/orders');
  }, [address, router]);

  return (
    <ScrollView style={checkoutStyles.container}>
      <Text style={checkoutStyles.title}>Checkout</Text>
      
      <View style={checkoutStyles.section}>
        <Text style={checkoutStyles.sectionTitle}>Delivery Address</Text>
        <AddressForm
          address={address}
          onAddressChange={handleAddressChange}
        />
      </View>
      
      <View style={checkoutStyles.section}>
        <Text style={checkoutStyles.sectionTitle}>Payment Method</Text>
        <PaymentMethodSelector
          selectedMethod={selectedPaymentMethod}
          onSelect={handlePaymentMethodSelect}
        />
      </View>
      
      <View style={checkoutStyles.section}>
        <Text style={checkoutStyles.sectionTitle}>Order Summary</Text>
        <OrderSummary
          items={cart.items}
          totalAmount={totalAmount}
        />
      </View>
      
      <View style={checkoutStyles.footer}>
        <View style={checkoutStyles.totalContainer}>
          <Text style={checkoutStyles.totalLabel}>Total:</Text>
          <Text style={checkoutStyles.totalAmount}>₹{totalAmount.toFixed(2)}</Text>
        </View>
        <Button
          title="Place Order"
          onPress={handlePlaceOrder}
          style={checkoutStyles.placeOrderButton}
        />
      </View>
    </ScrollView>
  );
}
