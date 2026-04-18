import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AddressSelector } from '@/src/components/checkout/address-selector';
import { PaymentMethod } from '@/src/components/checkout/payment-method';
import { OrderSummary } from '@/src/components/checkout/order-summary';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { colors } from '@/src/theme';
import checkoutStyles from '@/src/styles/checkout';

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

interface PaymentMethodType {
  id: string;
  name: string;
  type: 'card' | 'upi' | 'cash';
  lastFour?: string;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export default function CheckoutScreen() {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', name: 'Home', address: '123 Main St', city: 'Mumbai', pincode: '400001', isDefault: true },
    { id: '2', name: 'Work', address: '456 Business Ave', city: 'Mumbai', pincode: '400002', isDefault: false },
  ]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodType[]>([
    { id: '1', name: 'Credit Card', type: 'card', lastFour: '1234' },
    { id: '2', name: 'UPI', type: 'upi' },
    { id: '3', name: 'Cash on Delivery', type: 'cash' },
  ]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { id: '1', name: 'Margherita Pizza', quantity: 1, price: 299 },
    { id: '2', name: 'Garlic Bread', quantity: 2, price: 99 },
    { id: '3', name: 'Coke', quantity: 1, price: 49 },
  ]);

  const handleSelectAddress = useCallback((addressId: string) => {
    setSelectedAddress(addressId);
  }, []);

  const handleSelectPayment = useCallback((paymentId: string) => {
    setSelectedPayment(paymentId);
  }, []);

  const handlePlaceOrder = useCallback(() => {
    if (!selectedAddress) {
      Alert.alert('Error', 'Please select a delivery address');
      return;
    }
    if (!selectedPayment) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }
    Alert.alert('Success', 'Your order has been placed!');
    router.push('/(tabs)/orders');
  }, [selectedAddress, selectedPayment, router]);

  const subtotal = useMemo(() => {
    return orderItems.reduce((sum: number, item: OrderItem) => sum + (item.price * item.quantity), 0);
  }, [orderItems]);

  const deliveryFee = 40;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  return (
    <SafeAreaView style={checkoutStyles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={checkoutStyles.content}>
          <Text style={checkoutStyles.title}>Checkout</Text>
          
          <Card style={checkoutStyles.section}>
            <Text style={checkoutStyles.sectionTitle}>Delivery Address</Text>
            <AddressSelector
              addresses={addresses}
              selectedAddress={selectedAddress}
              onSelectAddress={handleSelectAddress}
            />
            <TouchableOpacity style={checkoutStyles.addButton}>
              <Text style={checkoutStyles.addButtonText}>+ Add New Address</Text>
            </TouchableOpacity>
          </Card>

          <Card style={checkoutStyles.section}>
            <Text style={checkoutStyles.sectionTitle}>Payment Method</Text>
            <PaymentMethod
              paymentMethods={paymentMethods}
              selectedPayment={selectedPayment}
              onSelectPayment={handleSelectPayment}
            />
          </Card>

          <Card style={checkoutStyles.section}>
            <Text style={checkoutStyles.sectionTitle}>Order Summary</Text>
            <OrderSummary
              items={orderItems}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              tax={tax}
              total={total}
            />
          </Card>
        </View>
      </ScrollView>
      
      <View style={checkoutStyles.footer}>
        <View style={checkoutStyles.totalContainer}>
          <Text style={checkoutStyles.totalLabel}>Total Amount</Text>
          <Text style={checkoutStyles.totalAmount}>₹{total.toFixed(2)}</Text>
        </View>
        <Button
          title="Place Order"
          onPress={handlePlaceOrder}
          variant="primary"
          style={checkoutStyles.orderButton}
          disabled={!selectedAddress || !selectedPayment}
        />
      </View>
    </SafeAreaView>
  );
}
