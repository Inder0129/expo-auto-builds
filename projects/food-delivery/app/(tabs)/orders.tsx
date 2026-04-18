import React, { useCallback, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OrderCard } from '@/src/components/order/order-card';
import { TrackingStepper } from '@/src/components/order/tracking-stepper';
import { colors, spacing, typography } from '@/src/theme';
import { ordersStyles } from '@/src/styles/orders';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  restaurantName: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';
  orderDate: string;
  estimatedDelivery: string;
}

export default function OrdersScreen() {
  const currentOrders: Order[] = useMemo(() => [
    {
      id: '1',
      restaurantName: 'Burger Palace',
      items: [
        { id: '1', name: 'Classic Burger', quantity: 2, price: 12.99 },
        { id: '2', name: 'French Fries', quantity: 1, price: 4.99 },
      ],
      totalAmount: 30.97,
      status: 'on_the_way',
      orderDate: '2024-01-15 18:30',
      estimatedDelivery: '19:15',
    },
  ], []);

  const pastOrders: Order[] = useMemo(() => [
    {
      id: '2',
      restaurantName: 'Sushi Zen',
      items: [
        { id: '1', name: 'Salmon Roll', quantity: 1, price: 15.99 },
        { id: '2', name: 'Miso Soup', quantity: 1, price: 3.99 },
      ],
      totalAmount: 19.98,
      status: 'delivered',
      orderDate: '2024-01-14 19:45',
      estimatedDelivery: '20:30',
    },
    {
      id: '3',
      restaurantName: 'Pizza Corner',
      items: [
        { id: '1', name: 'Margherita Pizza', quantity: 1, price: 18.99 },
      ],
      totalAmount: 18.99,
      status: 'delivered',
      orderDate: '2024-01-13 20:15',
      estimatedDelivery: '21:00',
    },
  ], []);

  const handleOrderPress = useCallback((orderId: string) => {
    console.log('Order pressed:', orderId);
  }, []);

  const handleTrackOrder = useCallback((orderId: string) => {
    console.log('Track order:', orderId);
  }, []);

  const handleReorder = useCallback((orderId: string) => {
    console.log('Reorder:', orderId);
  }, []);

  return (
    <SafeAreaView style={ordersStyles.container} edges={['top']}>
      <View style={ordersStyles.header}>
        <Text style={ordersStyles.title}>Your Orders</Text>
      </View>

      {currentOrders.length > 0 && (
        <View style={ordersStyles.section}>
          <Text style={ordersStyles.sectionTitle}>Current Orders</Text>
          {currentOrders.map((order: Order) => (
            <View key={order.id} style={ordersStyles.currentOrderContainer}>
              <OrderCard
                order={order}
                onPress={() => handleOrderPress(order.id)}
                onTrack={() => handleTrackOrder(order.id)}
                showActions={true}
              />
              <TrackingStepper
                status={order.status}
                style={ordersStyles.trackingStepper}
              />
            </View>
          ))}
        </View>
      )}

      <View style={ordersStyles.section}>
        <Text style={ordersStyles.sectionTitle}>Past Orders</Text>
        <FlatList
          data={pastOrders}
          keyExtractor={(item: Order) => item.id}
          renderItem={({ item }: { item: Order }) => (
            <OrderCard
              order={item}
              onPress={() => handleOrderPress(item.id)}
              onReorder={() => handleReorder(item.id)}
              showActions={true}
              style={ordersStyles.pastOrderCard}
            />
          )}
          contentContainerStyle={ordersStyles.pastOrderList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
