import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { OrderCard } from '@/src/components/orders/order-card';
import { TrackingStepper } from '@/src/components/orders/tracking-stepper';
import { EmptyState } from '@/src/components/orders/empty-state';
import { styles } from '@/src/styles/orders';

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  restaurantName: string;
  orderDate: string;
  totalAmount: number;
  status: 'pending' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';
  items: OrderItem[];
  trackingId?: string;
};

type TrackingStep = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  active: boolean;
};

export default function OrdersScreen() {
  const orders: Order[] = useMemo(() => [
    { 
      id: '1', 
      restaurantName: 'Burger Palace', 
      orderDate: '2024-01-15 14:30', 
      totalAmount: 24.99, 
      status: 'on_the_way', 
      trackingId: 'TRK123456',
      items: [
        { id: '1', name: 'Classic Burger', quantity: 2, price: 9.99 },
        { id: '2', name: 'French Fries', quantity: 1, price: 4.99 },
      ]
    },
    { 
      id: '2', 
      restaurantName: 'Pizza Corner', 
      orderDate: '2024-01-14 19:15', 
      totalAmount: 32.50, 
      status: 'delivered', 
      items: [
        { id: '1', name: 'Margherita Pizza', quantity: 1, price: 18.50 },
        { id: '2', name: 'Garlic Bread', quantity: 1, price: 7.00 },
        { id: '3', name: 'Coke', quantity: 2, price: 3.50 },
      ]
    },
    { 
      id: '3', 
      restaurantName: 'Sushi World', 
      orderDate: '2024-01-12 12:45', 
      totalAmount: 45.75, 
      status: 'delivered', 
      items: [
        { id: '1', name: 'Salmon Sushi Set', quantity: 1, price: 25.75 },
        { id: '2', name: 'Miso Soup', quantity: 2, price: 10.00 },
      ]
    },
  ], []);

  const trackingSteps: TrackingStep[] = useMemo(() => [
    { id: '1', title: 'Order Placed', description: 'Order confirmed', completed: true, active: false },
    { id: '2', title: 'Preparing', description: 'Restaurant preparing your order', completed: true, active: false },
    { id: '3', title: 'On the Way', description: 'Rider picked up your order', completed: true, active: true },
    { id: '4', title: 'Delivered', description: 'Order delivered', completed: false, active: false },
  ], []);

  const handleOrderPress = useCallback((orderId: string) => {
    console.log('Order pressed:', orderId);
  }, []);

  const handleReorder = useCallback((orderId: string) => {
    console.log('Reorder:', orderId);
  }, []);

  const handleTrackOrder = useCallback((orderId: string) => {
    console.log('Track order:', orderId);
  }, []);

  const handleRateOrder = useCallback((orderId: string) => {
    console.log('Rate order:', orderId);
  }, []);

  const activeOrder = orders.find((order: Order) => order.status === 'on_the_way');

  if (orders.length === 0) {
    return (
      <EmptyState 
        title="No Orders Yet" 
        description="Your order history will appear here" 
        buttonText="Start Ordering" 
        onButtonPress={() => console.log('Start ordering')} 
      />
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {activeOrder && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Order</Text>
          <TrackingStepper 
            steps={trackingSteps} 
            orderId={activeOrder.id} 
            estimatedTime="20-25 min" 
          />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order History</Text>
        {orders.map((order: Order) => (
          <OrderCard 
            key={order.id}
            order={order}
            onPress={() => handleOrderPress(order.id)}
            onReorder={() => handleReorder(order.id)}
            onTrackOrder={() => handleTrackOrder(order.id)}
            onRateOrder={() => handleRateOrder(order.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
