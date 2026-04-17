import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { clearCart } from '@/src/store/slices/cart';
import { addOrder } from '@/src/store/slices/orders';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { AddressSelector } from '@/src/components/checkout/address-selector';
import { PaymentMethod } from '@/src/components/checkout/payment-method';
import { OrderSummary } from '@/src/components/checkout/order-summary';
import { styles } from '@/src/styles/checkout';

type PaymentMethodType = 'card' | 'cash' | 'upi';

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
}

export default function CheckoutScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state: any) => state.cart);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethodType>('cash');
  
  const addresses: Address[] = useMemo(() => [
    {
      id: '1',
      name: 'John Doe',
      address: '123 Main Street',
      city: 'New York',
      pincode: '10001',
      phone: '+1 234-567-8900'
    },
    {
      id: '2',
      name: 'John Doe',
      address: '456 Park Avenue',
      city: 'New York',
      pincode: '10022',
      phone: '+1 234-567-8901'
    }
  ], []);
  
  const handleAddressSelect = useCallback((address: Address) => {
    setSelectedAddress(address);
  }, []);
  
  const handlePaymentSelect = useCallback((method: PaymentMethodType) => {
    setSelectedPayment(method);
  }, []);
  
  const handlePlaceOrder = useCallback(() => {
    if (!selectedAddress) {
      Alert.alert('Error', 'Please select a delivery address');
      return;
    }
    
    const order = {
      id: Date.now().toString(),
      items: cart.items,
      total: cart.total,
      address: selectedAddress,
      paymentMethod: selectedPayment,
      status: 'preparing',
      date: new Date().toISOString()
    };
    
    dispatch(addOrder(order));
    dispatch(clearCart());
    
    Alert.alert(
      'Order Placed!',
      'Your order has been placed successfully',
      [
        {
          text: 'OK',
          onPress: () => router.replace('/(tabs)/orders')
        }
      ]
    );
  }, [selectedAddress, selectedPayment, cart, dispatch, router]);
  
  const canPlaceOrder = useMemo(() => {
    return selectedAddress !== null && cart.items.length > 0;
  }, [selectedAddress, cart.items.length]);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <AddressSelector
          addresses={addresses}
          selectedAddress={selectedAddress}
          onSelect={handleAddressSelect}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <PaymentMethod
          selectedMethod={selectedPayment}
          onSelect={handlePaymentSelect}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <OrderSummary cart={cart} />
      </View>
      
      <View style={styles.footer}>
        <Button
          title="Place Order"
          onPress={handlePlaceOrder}
          disabled={!canPlaceOrder}
          style={styles.orderButton}
        />
      </View>
    </ScrollView>
  );
}
