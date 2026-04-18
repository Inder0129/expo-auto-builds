import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AddressSelector } from '@/src/components/checkout/address-selector';
import { PaymentMethod } from '@/src/components/checkout/payment-method';
import { OrderSummary } from '@/src/components/checkout/order-summary';
import { PlaceOrderButton } from '@/src/components/checkout/place-order-button';
import { styles } from '@/src/styles/checkout';
import { ViewStyle, TextStyle } from 'react-native';

type Address = {
  id: string;
  name: string;
  address: string;
  isDefault: boolean;
};

type PaymentMethodType = {
  id: string;
  type: 'card' | 'cash' | 'digital';
  lastFour?: string;
  name: string;
};

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

export default function CheckoutScreen() {
  const router = useRouter();
  
  const [selectedAddressId, setSelectedAddressId] = useState<string>('1');
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState<string>('1');
  
  const addresses: Address[] = [
    { id: '1', name: 'Home', address: '123 Main St, City, State 12345', isDefault: true },
    { id: '2', name: 'Work', address: '456 Office Ave, City, State 12345', isDefault: false },
  ];
  
  const paymentMethods: PaymentMethodType[] = [
    { id: '1', type: 'card', lastFour: '4242', name: 'Visa ending in 4242' },
    { id: '2', type: 'cash', name: 'Cash on Delivery' },
    { id: '3', type: 'digital', name: 'Digital Wallet' },
  ];
  
  const orderItems: OrderItem[] = [
    { id: '1', name: 'Classic Burger', quantity: 2, price: 12.99 },
    { id: '2', name: 'French Fries', quantity: 1, price: 4.99 },
    { id: '3', name: 'Soft Drink', quantity: 1, price: 2.49 },
  ];
  
  const subtotal = orderItems.reduce((sum: number, item: OrderItem) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 2.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;
  
  const handlePlaceOrder = useCallback(() => {
    console.log('Placing order with:', {
      addressId: selectedAddressId,
      paymentMethodId: selectedPaymentMethodId,
      total,
    });
    router.push(`/order/123`);
  }, [selectedAddressId, selectedPaymentMethodId, total, router]);
  
  const handleAddAddress = useCallback(() => {
    console.log('Add new address');
  }, []);
  
  const handleAddPaymentMethod = useCallback(() => {
    console.log('Add new payment method');
  }, []);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="location-outline" size={24} color="#FF6B35" />
          <Text style={styles.sectionTitle}>Delivery Address</Text>
        </View>
        <AddressSelector
          addresses={addresses}
          selectedId={selectedAddressId}
          onSelect={setSelectedAddressId}
          onAdd={handleAddAddress}
        />
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="card-outline" size={24} color="#FF6B35" />
          <Text style={styles.sectionTitle}>Payment Method</Text>
        </View>
        <PaymentMethod
          methods={paymentMethods}
          selectedId={selectedPaymentMethodId}
          onSelect={setSelectedPaymentMethodId}
          onAdd={handleAddPaymentMethod}
        />
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="receipt-outline" size={24} color="#FF6B35" />
          <Text style={styles.sectionTitle}>Order Summary</Text>
        </View>
        <OrderSummary
          items={orderItems}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          tax={tax}
          total={total}
        />
      </View>
      
      <PlaceOrderButton
        onPress={handlePlaceOrder}
        total={total}
      />
    </ScrollView>
  );
}
