import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { Button } from '@/src/components/ui';
import { useAppSelector } from '@/src/store/hooks';
import { styles } from '@/src/styles/orders';

interface OrdersScreenProps {}

type OrderTab = 'active' | 'past';

type Order = {
  id: string;
  restaurantName: string;
  total: number;
  status: string;
  items: Array<{ name: string; quantity: number }>;
  createdAt: string;
};

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
    <View style={[styles.orderCard, { backgroundColor: colors.surface, borderRadius: 12, padding: 16, marginBottom: 16 }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>{item.restaurantName}</Text>
        <Text style={{ fontSize: 16, fontWeight: '600', color: colors.primary }}>${item.total.toFixed(2)}</Text>
      </View>
      <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 8 }}>Status: {item.status}</Text>
      <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 12 }}>
        {item.items.map((item: any) => `${item.quantity}x ${item.name}`).join(', ')}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="View Details" onPress={() => handleOrderPress(item.id)} style={{ paddingHorizontal: 12, paddingVertical: 6 }} />
        <Button title="Reorder" onPress={() => handleReorderPress(item.id)} style={{ paddingHorizontal: 12, paddingVertical: 6 }} />
      </View>
    </View>
  ), [handleOrderPress, handleReorderPress]);
  
  const renderActiveOrders = useCallback(() => {
    if (filteredOrders.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="fast-food-outline" size={64} color={colors.textSecondary} />
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginTop: 16, marginBottom: 8 }}>No active orders</Text>
          <Text style={{ fontSize: 14, color: colors.textSecondary, textAlign: 'center' }}>Your active orders will appear here</Text>
        </View>
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
        <View style={styles.emptyState}>
          <Ionicons name="time-outline" size={64} color={colors.textSecondary} />
          <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginTop: 16, marginBottom: 8 }}>No past orders</Text>
          <Text style={{ fontSize: 14, color: colors.textSecondary, textAlign: 'center' }}>Your order history will appear here</Text>
        </View>
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
              onPress={() => {}}
              style={{ paddingHorizontal: 12, paddingVertical: 6 }}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
