import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/src/theme';
import { Button } from '@/src/components/ui';
import { AddressSelector } from '@/src/components/checkout/address-selector';
import { PaymentMethod } from '@/src/components/checkout/payment-method';
import { OrderSummary } from '@/src/components/checkout/order-summary';
import { PlaceOrderButton } from '@/src/components/checkout/place-order-button';
import { checkoutStyles } from '@/src/styles/checkout';

type PaymentMethodType = 'card' | 'cash' | 'upi';
type AddressType = {
  id: string;
  name: string;
  address: string;
  city: string;
  pincode: string;
  isDefault: boolean;
};

type OrderItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type OrderSummaryType = {
  items: OrderItemType[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
};

export default function CheckoutScreen() {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType>('card');
  
  const orderSummary: OrderSummaryType = useMemo(() => ({
    items: [
      { id: '1', name: 'Margherita Pizza', price: 12.99, quantity: 1 },
      { id: '2', name: 'Garlic Bread', price: 5.99, quantity: 2 },
    ],
    subtotal: 24.97,
    deliveryFee: 2.99,
    tax: 2.75,
    total: 30.71,
  }), []);
  
  const addresses: AddressType[] = useMemo(() => ([
    { id: '1', name: 'Home', address: '123 Main St', city: 'New York', pincode: '10001', isDefault: true },
    { id: '2', name: 'Work', address: '456 Office Ave', city: 'New York', pincode: '10002', isDefault: false },
  ]), []);
  
  const handleAddressSelect = useCallback((address: AddressType) => {
    setSelectedAddress(address);
  }, []);
  
  const handlePaymentMethodSelect = useCallback((method: PaymentMethodType) => {
    setSelectedPaymentMethod(method);
  }, []);
  
  const handlePlaceOrder = useCallback(() => {
    if (!selectedAddress) {
      Alert.alert('Error', 'Please select a delivery address');
      return;
    }
    
    Alert.alert(
      'Confirm Order',
      `Place order for $${orderSummary.total.toFixed(2)} to ${selectedAddress.address}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Confirm', 
          onPress: () => {
            router.push('/order-success');
          }
        },
      ]
    );
  }, [selectedAddress, orderSummary.total, router]);
  
  return (
    <SafeAreaView style={checkoutStyles.container} edges={['bottom']}>
      <ScrollView style={checkoutStyles.scrollView}>
        <Text style={checkoutStyles.title}>Checkout</Text>
        
        <AddressSelector 
          addresses={addresses}
          selectedAddress={selectedAddress}
          onSelect={handleAddressSelect}
          onAddAddress={() => router.push('/addresses')}
        />
        
        <PaymentMethod 
          selectedMethod={selectedPaymentMethod}
          onSelect={handlePaymentMethodSelect}
        />
        
        <OrderSummary 
          summary={orderSummary}
        />
      </ScrollView>
      
      <View style={checkoutStyles.footer}>
        <PlaceOrderButton 
          total={orderSummary.total}
          onPress={handlePlaceOrder}
          disabled={!selectedAddress}
        />
      </View>
    </SafeAreaView>
  );
}
