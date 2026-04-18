import React, { useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { OrderCard } from '@/src/components/order-card';
import { TrackingProgress } from '@/src/components/tracking-progress';
import { EmptyState } from '@/src/components/empty-state';
import { ordersStyles } from '@/src/styles/orders';

interface Order {
  id: string;
  restaurantName: string;
  date: string;
  status: 'delivered' | 'preparing' | 'on_the_way' | 'cancelled';
  items: string[];
  totalAmount: number;
  trackingSteps?: string[];
}

export default function OrdersScreen() {
  const orders: Order[] = useMemo(() => [
    { id: '1', restaurantName: 'Burger Palace', date: 'Today, 2:30 PM', status: 'on_the_way', items: ['Cheese Burger', 'Fries'], totalAmount: 450, trackingSteps: ['Order Placed', 'Preparing', 'On the way', 'Delivered'] },
    { id: '2', restaurantName: 'Sushi Zen', date: 'Yesterday, 7:45 PM', status: 'delivered', items: ['Salmon Sushi', 'Miso Soup'], totalAmount: 1200 },
    { id: '3', restaurantName: 'Pizza Heaven', date: 'Oct 12, 1:15 PM', status: 'delivered', items: ['Margherita Pizza', 'Garlic Bread'], totalAmount: 650 },
    { id: '4', restaurantName: 'Chinese Wok', date: 'Oct 10, 8:30 PM', status: 'cancelled', items: ['Fried Rice', 'Spring Rolls'], totalAmount: 550 },
  ], []);

  const currentOrder = useMemo(() => orders.find((order: Order) => order.status === 'on_the_way'), [orders]);

  const handleOrderPress = useCallback((orderId: string) => {
    console.log('Order pressed:', orderId);
  }, []);

  const handleReorder = useCallback((orderId: string) => {
    console.log('Reorder:', orderId);
  }, []);

  const handleTrackOrder = useCallback((orderId: string) => {
    console.log('Track order:', orderId);
  }, []);

  const renderOrderItem = useCallback(({ item }: { item: Order }) => (
    <OrderCard
      order={item}
      onPress={() => handleOrderPress(item.id)}
      onReorder={() => handleReorder(item.id)}
      onTrack={() => handleTrackOrder(item.id)}
    />
  ), [handleOrderPress, handleReorder, handleTrackOrder]);

  if (orders.length === 0) {
    return (
      <EmptyState
        icon="receipt-outline"
        title="No Orders Yet"
        description="Your order history will appear here"
        buttonText="Browse Restaurants"
        onButtonPress={() => console.log('Browse restaurants')}
      />
    );
  }

  return (
    <View style={ordersStyles.container}>
      <View style={ordersStyles.header}>
        <Text style={ordersStyles.title}>Orders</Text>
        <TouchableOpacity style={ordersStyles.filterButton}>
          <Ionicons name="filter" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {currentOrder && (
        <View style={ordersStyles.currentOrderSection}>
          <Text style={ordersStyles.sectionTitle}>Current Order</Text>
          <TrackingProgress
            order={currentOrder}
            onTrack={() => handleTrackOrder(currentOrder.id)}
          />
        </View>
      )}

      <View style={ordersStyles.section}>
        <Text style={ordersStyles.sectionTitle}>Order History</Text>
        <FlatList
          data={orders.filter((order: Order) => order.status !== 'on_the_way')}
          renderItem={renderOrderItem}
          keyExtractor={(item: Order) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={ordersStyles.ordersList}
        />
      </View>
    </View>
  );
}
