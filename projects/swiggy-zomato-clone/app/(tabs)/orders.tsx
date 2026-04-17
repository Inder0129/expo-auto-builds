import React, { useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OrderHistoryList from '@/src/components/orders/OrderHistoryList';
import OrderStatusCard from '@/src/components/orders/OrderStatusCard';
import { useAppSelector } from '@/src/store/hooks';
import { selectOrders } from '@/src/store/slices/orders';
import styles from '@/src/styles/orders';

export default function OrdersScreen() {
  const orders = useAppSelector(selectOrders);
  
  const activeOrders = orders.filter(order => order.status !== 'delivered');
  const pastOrders = orders.filter(order => order.status === 'delivered');

  const handleReorder = useCallback((orderId: string) => {
    // Handle reorder logic
  }, []);

  const handleTrackOrder = useCallback((orderId: string) => {
    // Navigate to order tracking
  }, []);

  const handleOrderPress = useCallback((orderId: string) => {
    // Navigate to order details
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {activeOrders.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Orders</Text>
            {activeOrders.map(order => (
              <OrderStatusCard
                key={order.id}
                order={order}
                onTrackPress={() => handleTrackOrder(order.id)}
              />
            ))}
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order History</Text>
          <OrderHistoryList
            orders={pastOrders}
            onReorder={handleReorder}
            onOrderPress={handleOrderPress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
