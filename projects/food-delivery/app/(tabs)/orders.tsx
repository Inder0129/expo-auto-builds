import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { OrderCard } from '@/src/components/orders/order-card';
import { OrderTimeline } from '@/src/components/orders/order-timeline';
import { EmptyState } from '@/src/components/orders/empty-state';
import { styles } from '@/src/styles/orders';
import { colors } from '@/src/theme';

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  restaurantName: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'onTheWay' | 'delivered' | 'cancelled';
  orderDate: string;
  estimatedDelivery: string;
};

export default function OrdersScreen() {
  const orders: Order[] = useMemo(() => [
    {
      id: '1',
      restaurantName: 'Burger Palace',
      items: [
        { id: '1', name: 'Classic Burger', quantity: 2, price: 299 },
        { id: '2', name: 'French Fries', quantity: 1, price: 99 },
      ],
      totalAmount: 697,
      status: 'onTheWay',
      orderDate: '2024-01-15 18:30',
      estimatedDelivery: '19:15',
    },
    {
      id: '2',
      restaurantName: 'Pizza Heaven',
      items: [
        { id: '3', name: 'Margherita Pizza', quantity: 1, price: 399 },
        { id: '4', name: 'Garlic Bread', quantity: 1, price: 149 },
      ],
      totalAmount: 548,
      status: 'delivered',
      orderDate: '2024-01-14 20:15',
      estimatedDelivery: '21:00',
    },
    {
      id: '3',
      restaurantName: 'Sushi Zen',
      items: [
        { id: '5', name: 'Salmon Sushi Set', quantity: 1, price: 599 },
        { id: '6', name: 'Miso Soup', quantity: 1, price: 99 },
      ],
      totalAmount: 698,
      status: 'preparing',
      orderDate: '2024-01-15 19:45',
      estimatedDelivery: '20:30',
    },
  ], []);

  const currentOrder = useMemo(() => {
    return orders.find((order: Order) => 
      order.status === 'pending' || order.status === 'preparing' || order.status === 'onTheWay'
    );
  }, [orders]);

  const pastOrders = useMemo(() => {
    return orders.filter((order: Order) => 
      order.status === 'delivered' || order.status === 'cancelled'
    );
  }, [orders]);

  const handleOrderPress = useCallback((orderId: string) => {
    console.log('Order pressed:', orderId);
  }, []);

  const handleReorder = useCallback((orderId: string) => {
    console.log('Reorder:', orderId);
  }, []);

  const handleTrackOrder = useCallback((orderId: string) => {
    console.log('Track order:', orderId);
  }, []);

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        message="Your order history will appear here"
        buttonText="Start Ordering"
        onButtonPress={() => console.log('Start ordering')}
      />
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {currentOrder && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Order</Text>
          <OrderCard
            order={currentOrder}
            onPress={() => handleOrderPress(currentOrder.id)}
            onTrackPress={() => handleTrackOrder(currentOrder.id)}
          />
          <OrderTimeline status={currentOrder.status} />
        </View>
      )}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order History</Text>
        {pastOrders.map((order: Order) => (
          <OrderCard
            key={order.id}
            order={order}
            onPress={() => handleOrderPress(order.id)}
            onReorderPress={() => handleReorder(order.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
