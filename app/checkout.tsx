import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { clearCart } from '@/src/store/slices/cart';
import { createOrder } from '@/src/store/slices/orders';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { AddressSelector } from '@/src/components/checkout/address-selector';
import { PaymentMethod } from '@/src/components/checkout/payment-method';
import { OrderSummary } from '@/src/components/checkout/order-summary';
import { PlaceOrderButton } from '@/src/components/checkout/place-order-button';
import styles from '@/src/styles/checkout';

interface CheckoutScreenProps {}

const CheckoutScreen: React.FC<CheckoutScreenProps> = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: any) => state.cart.items);
  const user = useAppSelector((state: any) => state.auth.user);
  
  const [selectedAddress, setSelectedAddress] = useState<string>('1');
  const [selectedPayment, setSelectedPayment] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const addresses = useMemo(() => ([
    { id: '1', name: 'Home', address: '123 Main St, City, State 12345', isDefault: true },
    { id: '2', name: 'Work', address: '456 Office Ave, City, State 12345', isDefault: false },
  ]), []);
  
  const paymentMethods = useMemo(() => ([
    { id: 'card', name: 'Credit/Debit Card', icon: 'card-outline' },
    { id: 'cash', name: 'Cash on Delivery', icon: 'cash-outline' },
    { id: 'wallet', name: 'Digital Wallet', icon: 'wallet-outline' },
  ]), []);
  
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
  }, [cartItems]);
  
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;
  
  const handleAddressSelect = useCallback((addressId: string) => {
    setSelectedAddress(addressId);
  }, []);
  
  const handlePaymentSelect = useCallback((paymentId: string) => {
    setSelectedPayment(paymentId);
  }, []);
  
  const handlePlaceOrder = useCallback(async () => {
    if (cartItems.length === 0) {
      Alert.alert('Error', 'Your cart is empty');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const order = {
        id: `ORD-${Date.now()}`,
        items: cartItems,
        address: addresses.find((addr: any) => addr.id === selectedAddress),
        paymentMethod: paymentMethods.find((pmt: any) => pmt.id === selectedPayment),
        subtotal,
        deliveryFee,
        tax,
        total,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      dispatch(createOrder(order));
      dispatch(clearCart());
      
      router.replace(`/order-tracking/${order.id}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [cartItems, addresses, selectedAddress, paymentMethods, selectedPayment, subtotal, deliveryFee, tax, total, dispatch, router]);
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Checkout</Text>
      
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <AddressSelector
          addresses={addresses}
          selectedAddress={selectedAddress}
          onSelectAddress={handleAddressSelect}
          style={styles.addressSelector}
        />
      </Card>
      
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <PaymentMethod
          methods={paymentMethods}
          selectedMethod={selectedPayment}
          onSelectMethod={handlePaymentSelect}
          style={styles.paymentMethod}
        />
      </Card>
      
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <OrderSummary
          items={cartItems}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          tax={tax}
          total={total}
          style={styles.orderSummary}
        />
      </Card>
      
      <PlaceOrderButton
        onPress={handlePlaceOrder}
        total={total}
        isProcessing={isProcessing}
        style={styles.placeOrderButton}
      />
    </ScrollView>
  );
};

export default CheckoutScreen;