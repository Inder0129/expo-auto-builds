import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { clearCart } from '@/src/store/slices/cart';
import { addOrder } from '@/src/store/slices/orders';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import { AddressSelector } from '@/src/components/checkout/address-selector';
import { PaymentMethod } from '@/src/components/checkout/payment-method';
import { OrderSummary } from '@/src/components/checkout/order-summary';
import { PlaceOrderButton } from '@/src/components/checkout/place-order-button';
import { styles } from '@/src/styles/checkout';

interface Address {
  id: string;
  name: string;
  address: string;
  isDefault: boolean;
}

interface PaymentMethodType {
  id: string;
  name: string;
  icon: string;
  isDefault: boolean;
}

export default function CheckoutScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  
  const [selectedAddress, setSelectedAddress] = useState<string>('1');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('1');
  
  const addresses: Address[] = useMemo(() => ([
    { id: '1', name: 'Home', address: '123 Main St, City, State 12345', isDefault: true },
    { id: '2', name: 'Work', address: '456 Office Ave, City, State 12345', isDefault: false },
  ]), []);
  
  const paymentMethods: PaymentMethodType[] = useMemo(() => ([
    { id: '1', name: 'Credit Card', icon: 'card-outline', isDefault: true },
    { id: '2', name: 'Cash on Delivery', icon: 'cash-outline', isDefault: false },
    { id: '3', name: 'PayPal', icon: 'logo-paypal', isDefault: false },
  ]), []);
  
  const subtotal = useMemo(() => 
    cartItems.reduce((sum: number, item) => sum + (item.price * item.quantity), 0),
    [cartItems]
  );
  
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;
  
  const handleAddressSelect = useCallback((addressId: string) => {
    setSelectedAddress(addressId);
  }, []);
  
  const handlePaymentMethodSelect = useCallback((methodId: string) => {
    setSelectedPaymentMethod(methodId);
  }, []);
  
  const handlePlaceOrder = useCallback(() => {
    const orderId = Date.now().toString();
    const selectedAddressObj = addresses.find(a => a.id === selectedAddress);
    const selectedPaymentObj = paymentMethods.find(p => p.id === selectedPaymentMethod);
    
    dispatch(addOrder({
      id: orderId,
      items: cartItems,
      total,
      address: selectedAddressObj?.address || '',
      paymentMethod: selectedPaymentObj?.name || '',
      status: 'preparing',
      estimatedDelivery: '30-40 min',
      createdAt: new Date().toISOString(),
    }));
    
    dispatch(clearCart());
    
    Alert.alert(
      'Order Placed!',
      'Your order has been placed successfully. You can track it in the Orders tab.',
      [
        {
          text: 'Track Order',
          onPress: () => router.push(`/order/${orderId}`),
        },
        {
          text: 'Continue Shopping',
          onPress: () => router.push('/(tabs)'),
        },
      ]
    );
  }, [cartItems, selectedAddress, selectedPaymentMethod, addresses, paymentMethods, dispatch, router, total]);
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Checkout</Text>
          
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
              methods={paymentMethods}
              selectedMethodId={selectedPaymentMethod}
              onSelectMethod={handlePaymentMethodSelect}
            />
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            <OrderSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              tax={tax}
              total={total}
            />
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <PlaceOrderButton
          onPress={handlePlaceOrder}
          disabled={cartItems.length === 0}
          total={total}
        />
      </View>
    </SafeAreaView>
  );
}
