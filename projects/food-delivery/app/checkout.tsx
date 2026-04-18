import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
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
import { PlaceOrderButton } from '@/src/components/checkout/place-order-button';
import { styles } from '@/src/styles/checkout';

interface CheckoutScreenProps {}

interface Address {
  id: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  isDefault: boolean;
}

interface PaymentMethodType {
  id: string;
  name: string;
  type: 'card' | 'cash' | 'digital';
  lastFour?: string;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: any) => state.cart.items);
  const user = useAppSelector((state: any) => state.user.currentUser);
  
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const addresses: Address[] = useMemo(() => [
    {
      id: '1',
      name: 'Home',
      address: '123 Main St',
      city: 'New York',
      postalCode: '10001',
      isDefault: true
    },
    {
      id: '2',
      name: 'Work',
      address: '456 Office Ave',
      city: 'New York',
      postalCode: '10002',
      isDefault: false
    }
  ], []);
  
  const paymentMethods: PaymentMethodType[] = useMemo(() => [
    {
      id: '1',
      name: 'Credit Card',
      type: 'card',
      lastFour: '4242'
    },
    {
      id: '2',
      name: 'Cash on Delivery',
      type: 'cash'
    },
    {
      id: '3',
      name: 'PayPal',
      type: 'digital'
    }
  ], []);
  
  const subtotal = useMemo(() => {
    return cartItems.reduce((total: number, item: any) => {
      return total + (item.price * item.quantity);
    }, 0);
  }, [cartItems]);
  
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;
  
  const handleAddressSelect = useCallback((addressId: string) => {
    setSelectedAddress(addressId);
  }, []);
  
  const handlePaymentMethodSelect = useCallback((methodId: string) => {
    setSelectedPaymentMethod(methodId);
  }, []);
  
  const handlePlaceOrder = useCallback(async () => {
    if (!selectedAddress) {
      Alert.alert('Error', 'Please select a delivery address');
      return;
    }
    
    if (!selectedPaymentMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }
    
    if (cartItems.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const selectedAddressObj = addresses.find((addr: Address) => addr.id === selectedAddress);
      const selectedPaymentObj = paymentMethods.find((method: PaymentMethodType) => method.id === selectedPaymentMethod);
      
      const order = {
        id: `ORD-${Date.now()}`,
        items: cartItems,
        subtotal,
        deliveryFee,
        tax,
        total,
        address: selectedAddressObj,
        paymentMethod: selectedPaymentObj,
        status: 'pending',
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString()
      };
      
      dispatch(addOrder(order));
      dispatch(clearCart());
      
      setTimeout(() => {
        setIsProcessing(false);
        router.replace(`/order-tracking/${order.id}`);
      }, 1500);
      
    } catch (error) {
      setIsProcessing(false);
      Alert.alert('Error', 'Failed to place order. Please try again.');
    }
  }, [selectedAddress, selectedPaymentMethod, cartItems, addresses, paymentMethods, subtotal, deliveryFee, tax, total, dispatch, router]);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <AddressSelector 
          addresses={addresses}
          selectedAddressId={selectedAddress}
          onSelectAddress={handleAddressSelect}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <PaymentMethod 
          paymentMethods={paymentMethods}
          selectedMethodId={selectedPaymentMethod}
          onSelectMethod={handlePaymentMethodSelect}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <OrderSummary 
          items={cartItems}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          tax={tax}
          total={total}
        />
      </View>
      
      <View style={styles.footer}>
        <PlaceOrderButton 
          onPress={handlePlaceOrder}
          disabled={isProcessing || !selectedAddress || !selectedPaymentMethod || cartItems.length === 0}
          isLoading={isProcessing}
          total={total}
        />
      </View>
    </ScrollView>
  );
};

export default CheckoutScreen;