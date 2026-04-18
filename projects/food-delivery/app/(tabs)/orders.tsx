import React, { useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { OrderCard } from '@/src/components/order-card';
import { TrackingStepper } from '@/src/components/tracking-stepper';
import { EmptyState } from '@/src/components/empty-state';
import { useAppSelector } from '@/src/store/hooks';
import { Order } from '@/src/store/slices/orders';
import styles from '@/src/styles/orders';

interface OrdersScreenProps {}

export default function OrdersScreen(props: OrdersScreenProps) {
  const orders = useAppSelector((state: any) => state.orders.all);
  const activeOrders = useMemo(() => 
    orders.filter((order: Order) => order.status !== 'delivered' && order.status !== 'cancelled'),
    [orders]
  );
  const pastOrders = useMemo(() => 
    orders.filter((order: Order) => order.status === 'delivered' || order.status === 'cancelled'),
    [orders]
  );
  
  const [activeTab, setActiveTab] = React.useState<'active' | 'past'>('active');

  const handleOrderPress = useCallback((orderId: string) => {
    // Navigate to order details
  }, []);

  const handleTrackOrder = useCallback((orderId: string) => {
    // Navigate to order tracking modal
  }, []);

  const handleReorder = useCallback((orderId: string) => {
    // Add items to cart
  }, []);

  const handleRateOrder = useCallback((orderId: string) => {
    // Navigate to rating screen
  }, []);

  const renderOrderItem = useCallback(({ item }: { item: Order }) => (
    <OrderCard
      order={item}
      onPress={() => handleOrderPress(item.id)}
      onTrack={() => handleTrackOrder(item.id)}
      onReorder={() => handleReorder(item.id)}
      onRate={() => handleRateOrder(item.id)}
      style={styles.orderItem}
    />
  ), [handleOrderPress, handleTrackOrder, handleReorder, handleRateOrder]);

  const renderActiveOrders = useCallback(() => {
    if (activeOrders.length === 0) {
      return (
        <EmptyState
          icon="fast-food-outline"
          title="No active orders"
          description="Your upcoming orders will appear here"
          actionText="Browse Restaurants"
          onAction={() => {}}
        />
      );
    }

    return (
      <FlatList
        data={activeOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item: Order) => item.id}
        contentContainerStyle={styles.ordersList}
        showsVerticalScrollIndicator={false}
      />
    );
  }, [activeOrders, renderOrderItem]);

  const renderPastOrders = useCallback(() => {
    if (pastOrders.length === 0) {
      return (
        <EmptyState
          icon="receipt-outline"
          title="No past orders"
          description="Your order history will appear here"
          actionText="Browse Restaurants"
          onAction={() => {}}
        />
      );
    }

    return (
      <FlatList
        data={pastOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item: Order) => item.id}
        contentContainerStyle={styles.ordersList}
        showsVerticalScrollIndicator={false}
      />
    );
  }, [pastOrders, renderOrderItem]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="help-circle-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
            Active ({activeOrders.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>
            Past ({pastOrders.length})
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'active' ? renderActiveOrders() : renderPastOrders()}

      {activeOrders.length > 0 && activeTab === 'active' && (
        <View style={styles.trackingSection}>
          <Text style={styles.trackingTitle}>Track Your Order</Text>
          <TrackingStepper
            currentStep={2}
            steps={[
              { id: '1', label: 'Order Placed', time: '10:30 AM' },
              { id: '2', label: 'Preparing', time: '10:45 AM' },
              { id: '3', label: 'On the Way', time: 'Estimated 11:15 AM' },
              { id: '4', label: 'Delivered', time: '' }
            ]}
            style={styles.trackingStepper}
          />
        </View>
      )}
    </View>
  );
}
