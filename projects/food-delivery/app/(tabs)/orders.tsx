import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { OrderCard } from '@/src/components/order-card';
import { TrackingStepper } from '@/src/components/tracking-stepper';
import { EmptyState } from '@/src/components/empty-state';
import { useAppSelector } from '@/src/store/hooks';
import { Order } from '@/src/store/slices/orders';
import { styles } from '@/src/styles/orders';

export default function OrdersScreen() {
  const orders = useAppSelector((state: any) => state.orders.list);
  const activeOrder = useAppSelector((state: any) => state.orders.active);
  
  const orderTabs = useMemo(() => [
    { id: 'active', label: 'Active' },
    { id: 'past', label: 'Past Orders' },
  ], []);
  const [activeTab, setActiveTab] = React.useState<string>('active');
  
  const handleTabPress = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);
  
  const handleOrderPress = useCallback((orderId: string) => {
    // Navigate to order detail
  }, []);
  
  const handleTrackOrder = useCallback((orderId: string) => {
    // Navigate to tracking screen
  }, []);
  
  const handleReorder = useCallback((orderId: string) => {
    // Handle reorder
  }, []);
  
  const renderOrderItem = useCallback(({ item }: { item: Order }) => (
    <OrderCard
      order={item}
      onPress={() => handleOrderPress(item.id)}
      onTrack={() => handleTrackOrder(item.id)}
      onReorder={() => handleReorder(item.id)}
    />
  ), [handleOrderPress, handleTrackOrder, handleReorder]);
  
  const filteredOrders = useMemo(() => {
    if (activeTab === 'active') {
      return orders.filter((order: Order) => order.status !== 'delivered');
    }
    return orders.filter((order: Order) => order.status === 'delivered');
  }, [orders, activeTab]);
  
  if (orders.length === 0) {
    return (
      <EmptyState
        icon="receipt"
        title="No orders yet"
        description="Your orders will appear here"
        actionLabel="Start Ordering"
        onAction={() => {}}
      />
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
      </View>
      
      <View style={styles.tabsContainer}>
        {orderTabs.map((tab: { id: string; label: string }) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && styles.activeTab
            ]}
            onPress={() => handleTabPress(tab.id)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {activeOrder && activeTab === 'active' && (
          <View style={styles.activeOrderSection}>
            <Text style={styles.sectionTitle}>Current Order</Text>
            <TrackingStepper order={activeOrder} />
            <TouchableOpacity
              style={styles.trackButton}
              onPress={() => handleTrackOrder(activeOrder.id)}
            >
              <Text style={styles.trackButtonText}>Track Order</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {activeTab === 'active' ? 'Active Orders' : 'Order History'}
          </Text>
          <FlatList
            data={filteredOrders}
            renderItem={renderOrderItem}
            keyExtractor={(item: Order) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.ordersList}
          />
        </View>
      </ScrollView>
    </View>
  );
}
