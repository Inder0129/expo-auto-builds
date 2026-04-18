import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { OrderCard } from '@/src/components/orders/order-card';
import { StatusStepper } from '@/src/components/orders/status-stepper';
import { OrderTabs } from '@/src/components/orders/order-tabs';
import { Button } from '@/src/components/ui/button';
import { colors } from '@/src/theme';
import { styles } from '@/src/styles/orders';

interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

type OrderTab = 'active' | 'past';

export default function OrdersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<OrderTab>('active');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const orders: OrderItem[] = useMemo(() => [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      date: '2024-01-15',
      total: 149.99,
      status: 'shipped',
      items: [
        { id: 'p1', name: 'Wireless Headphones', quantity: 1, price: 99.99 },
        { id: 'p2', name: 'Phone Case', quantity: 2, price: 25.00 }
      ]
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      date: '2024-01-10',
      total: 89.50,
      status: 'delivered',
      items: [
        { id: 'p3', name: 'Smart Watch', quantity: 1, price: 89.50 }
      ]
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      date: '2024-01-05',
      total: 210.75,
      status: 'pending',
      items: [
        { id: 'p4', name: 'Laptop Bag', quantity: 1, price: 75.25 },
        { id: 'p5', name: 'USB-C Cable', quantity: 3, price: 45.00 }
      ]
    }
  ], []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order: OrderItem) => {
      if (activeTab === 'active') {
        return order.status !== 'delivered' && order.status !== 'cancelled';
      }
      return order.status === 'delivered' || order.status === 'cancelled';
    });
  }, [orders, activeTab]);

  const handleTabChange = useCallback((tab: OrderTab) => {
    setActiveTab(tab);
  }, []);

  const handleOrderPress = useCallback((orderId: string) => {
    setSelectedOrder(selectedOrder === orderId ? null : orderId);
  }, [selectedOrder]);

  const handleTrackOrder = useCallback((orderId: string) => {
    router.push(`/track-order?id=${orderId}`);
  }, [router]);

  const handleReorder = useCallback((orderId: string) => {
    console.log('Reorder:', orderId);
  }, []);

  const renderOrderItem = useCallback(({ item }: { item: OrderItem }) => (
    <OrderCard
      order={item}
      isExpanded={selectedOrder === item.id}
      onPress={() => handleOrderPress(item.id)}
      onTrack={() => handleTrackOrder(item.id)}
      onReorder={() => handleReorder(item.id)}
    />
  ), [selectedOrder, handleOrderPress, handleTrackOrder, handleReorder]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <OrderTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item: OrderItem) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {selectedOrder && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Order Status</Text>
          <StatusStepper currentStatus={orders.find((o: OrderItem) => o.id === selectedOrder)?.status || 'pending'} />
        </View>
      )}
    </SafeAreaView>
  );
}
