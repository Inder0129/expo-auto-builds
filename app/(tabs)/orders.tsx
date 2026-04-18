import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { Button } from '@/src/components/ui';
import { OrderCard } from '@/src/components/order-card';
import { TrackingStepper } from '@/src/components/tracking-stepper';
import { EmptyState } from '@/src/components/empty-state';
import { useAppSelector } from '@/src/store/hooks';
import { Order } from '@/src/store/slices/orders';
import { styles } from '@/src/styles/orders';

interface OrdersScreenProps {}

type OrderTab = 'active' | 'past';

export default function OrdersScreen(props: OrdersScreenProps) {
  const [activeTab, setActiveTab] = useState<OrderTab>('active');
  
  const orders = useAppSelector((state: any) => state.orders.orders);
  
  const filteredOrders = useMemo(() => {
    const now = new Date();
    return orders.filter((order: Order) => {
      if (activeTab === 'active') {
        return order.status !== 'delivered' && order.status !== 'cancelled';
      } else {
        return order.status === 'delivered' || order.status === 'cancelled';
      }
    });
  }, [orders, activeTab]);
  
  const handleTabPress = useCallback((tab: OrderTab) => {
    setActiveTab(tab);
  }, []);
  
  const handleOrderPress = useCallback((orderId: string) => {
    // Navigate to order detail
  }, []);
  
  const handleReorderPress = useCallback((orderId: string) => {
    // Handle reorder
  }, []);
  
  const renderOrderItem = useCallback(({ item }: { item: Order }) => (
    <OrderCard
      order={item}
      onPress={() => handleOrderPress(item.id)}
      onReorder={() => handleReorderPress(item.id)}
      style={styles.orderCard}
    />
  ), [handleOrderPress, handleReorderPress]);
  
  const renderActiveOrders = useCallback(() => {
    if (filteredOrders.length === 0) {
      return (
        <EmptyState
          icon="fast-food-outline"
          title="No active orders"
          description="Your active orders will appear here"
          style={styles.emptyState}
        />
      );
    }
    
    return (
      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item: Order) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.orderList}
      />
    );
  }, [filteredOrders, renderOrderItem]);
  
  const renderPastOrders = useCallback(() => {
    if (filteredOrders.length === 0) {
      return (
        <EmptyState
          icon="time-outline"
          title="No past orders"
          description="Your order history will appear here"
          style={styles.emptyState}
        />
      );
    }
    
    return (
      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item: Order) => item.id}
        scrollEnabled={false}
        contentContainerStyle={styles.orderList}
      />
    );
  }, [filteredOrders, renderOrderItem]);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => handleTabPress('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => handleTabPress('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>Past Orders</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {activeTab === 'active' ? renderActiveOrders() : renderPastOrders()}
        
        {activeTab === 'past' && filteredOrders.length > 0 && (
          <View style={styles.helpSection}>
            <Ionicons name="help-circle-outline" size={24} color={colors.primary} />
            <View style={styles.helpContent}>
              <Text style={styles.helpTitle}>Need help with your order?</Text>
              <Text style={styles.helpText}>Contact our support team for any issues</Text>
            </View>
            <Button
              title="Contact"
              variant="outline"
              size="small"
              onPress={() => {}}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
