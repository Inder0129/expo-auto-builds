import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '@/src/store/hooks';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui';
import { AddressSelector } from '@/src/components/checkout/address-selector';
import { PaymentMethod } from '@/src/components/checkout/payment-method';
import { OrderSummary } from '@/src/components/checkout/order-summary';
import { PlaceOrderButton } from '@/src/components/checkout/place-order-button';
import styles from '@/src/styles/checkout';

interface CheckoutScreenProps {}

type AddressType = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
};

type PaymentMethodType = {
  id: string;
  type: 'card' | 'cash' | 'wallet';
  lastFour?: string;
  name: string;
  isDefault: boolean;
};

export default function CheckoutScreen(props: CheckoutScreenProps) {
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart);
  const [selectedAddress, setSelectedAddress] = useState<string>('1');
  const [selectedPayment, setSelectedPayment] = useState<string>('1');
  
  const addresses: AddressType[] = useMemo(() => ([
    {
      id: '1',
      name: 'Home',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1 (555) 123-4567',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Work',
      address: '456 Office Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      phone: '+1 (555) 987-6543',
      isDefault: false,
    },
  ]), []);
  
  const paymentMethods: PaymentMethodType[] = useMemo(() => ([
    {
      id: '1',
      type: 'card',
      lastFour: '4242',
      name: 'Visa ending in 4242',
      isDefault: true,
    },
    {
      id: '2',
      type: 'cash',
      name: 'Cash on Delivery',
      isDefault: false,
    },
    {
      id: '3',
      type: 'wallet',
      name: 'FoodWallet Balance',
      isDefault: false,
    },
  ]), []);
  
  const handleAddressSelect = useCallback((addressId: string) => {
    setSelectedAddress(addressId);
  }, []);
  
  const handlePaymentSelect = useCallback((paymentId: string) => {
    setSelectedPayment(paymentId);
  }, []);
  
  const handlePlaceOrder = useCallback(() => {
    // In a real app, this would dispatch an order creation action
    router.push('/order-tracking/123');
  }, [router]);
  
  const handleAddAddress = useCallback(() => {
    router.push('/addresses');
  }, [router]);
  
  const handleAddPayment = useCallback(() => {
    // Navigate to add payment screen
  }, []);
  
  if (cart.items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Button
          title="Browse Restaurants"
          onPress={() => router.push('/(tabs)/explore')}
          variant="primary"
          style={styles.emptyButton}
        />
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <Button
            title="Add New"
            onPress={handleAddAddress}
            variant="text"
            size="small"
          />
        </View>
        <AddressSelector
          addresses={addresses}
          selectedAddress={selectedAddress}
          onSelect={handleAddressSelect}
          style={styles.addressSelector}
        />
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <Button
            title="Add New"
            onPress={handleAddPayment}
            variant="text"
            size="small"
          />
        </View>
        <PaymentMethod
          methods={paymentMethods}
          selectedMethod={selectedPayment}
          onSelect={handlePaymentSelect}
          style={styles.paymentMethod}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <OrderSummary
          items={cart.items}
          subtotal={cart.subtotal}
          deliveryFee={2.99}
          tax={cart.subtotal * 0.08}
          style={styles.orderSummary}
        />
      </View>
      
      <PlaceOrderButton
        onPress={handlePlaceOrder}
        total={cart.subtotal + 2.99 + (cart.subtotal * 0.08)}
        style={styles.placeOrderButton}
      />
    </ScrollView>
  );
}
