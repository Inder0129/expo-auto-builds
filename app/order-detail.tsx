import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { StatusStepper } from '@/src/components/order-detail/status-stepper';
import { OrderItems } from '@/src/components/order-detail/order-items';
import { PriceBreakdown } from '@/src/components/order-detail/price-breakdown';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { colors } from '@/src/theme';
import { orderDetailStyles } from '@/src/styles/order-detail';

type OrderItemType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

type OrderDetailType = {
  id: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  items: OrderItemType[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: string;
  paymentMethod: string;
};

export default function OrderDetailScreen() {
  const params = useLocalSearchParams<{ orderId: string }>();
  
  // Mock data - in real app this would come from API
  const orderData: OrderDetailType = useMemo(() => ({
    id: params.orderId || '1',
    orderNumber: 'ORD-2024-00123',
    status: 'shipped',
    date: '2024-12-15',
    items: [
      { id: '1', name: 'Wireless Headphones', price: 99.99, quantity: 1, imageUrl: '' },
      { id: '2', name: 'Phone Case', price: 24.99, quantity: 2, imageUrl: '' },
    ],
    subtotal: 149.97,
    shipping: 5.99,
    tax: 12.00,
    total: 167.96,
    shippingAddress: '123 Main St, City, State 12345',
    paymentMethod: 'Visa **** 1234',
  }), [params.orderId]);
  
  const handleTrackOrder = useCallback(() => {
    console.log('Track order:', orderData.id);
  }, [orderData.id]);
  
  const handleContactSupport = useCallback(() => {
    console.log('Contact support for order:', orderData.id);
  }, [orderData.id]);
  
  return (
    <ScrollView style={orderDetailStyles.container}>
      <Card style={orderDetailStyles.headerCard}>
        <Text style={orderDetailStyles.orderNumber}>Order #{orderData.orderNumber}</Text>
        <Text style={orderDetailStyles.orderDate}>Placed on {orderData.date}</Text>
        
        <View style={orderDetailStyles.statusSection}>
          <Text style={orderDetailStyles.sectionTitle}>Order Status</Text>
          <StatusStepper currentStatus={orderData.status} />
        </View>
        
        <View style={orderDetailStyles.actionButtons}>
          <Button 
            title="Track Order" 
            onPress={handleTrackOrder} 
            variant="outline"
            style={orderDetailStyles.actionButton}
          />
          <Button 
            title="Contact Support" 
            onPress={handleContactSupport} 
            variant="outline"
            style={orderDetailStyles.actionButton}
          />
        </View>
      </Card>
      
      <OrderItems items={orderData.items} />
      
      <PriceBreakdown 
        subtotal={orderData.subtotal}
        shipping={orderData.shipping}
        tax={orderData.tax}
        total={orderData.total}
      />
      
      <Card style={orderDetailStyles.infoCard}>
        <View style={orderDetailStyles.infoSection}>
          <Text style={orderDetailStyles.sectionTitle}>Shipping Address</Text>
          <Text style={orderDetailStyles.infoText}>{orderData.shippingAddress}</Text>
        </View>
        
        <View style={orderDetailStyles.infoSection}>
          <Text style={orderDetailStyles.sectionTitle}>Payment Method</Text>
          <Text style={orderDetailStyles.infoText}>{orderData.paymentMethod}</Text>
        </View>
      </Card>
    </ScrollView>
  );
}
