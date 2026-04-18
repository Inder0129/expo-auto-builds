import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';
import { Button } from '@/src/components/ui';
import { Card } from '@/src/components/ui';
import { OrderCard } from '@/src/components/orders/order-card';
import { OrderStatus } from '@/src/components/orders/order-status';
import { EmptyState } from '@/src/components/orders/empty-state';
import { useAppSelector } from '@/src/store/hooks';
import { Order } from '@/src/types/order';
import { styles } from '@/src/styles/orders';

type OrdersScreenProps = {};

const OrdersScreen: React.FC<OrdersScreenProps> = () => {
  const router = useRouter();
  const user = useAppSelector((state: any) => state.auth.user);
  
  const orders: Order[] = useMemo(() => [
    {
      id: 'ORD001',
      restaurantName: 'Burger Palace',
      restaurantImage: 'https://example.com/burger.jpg',
      items: [
        { name: 'Cheeseburger', quantity: 2, price: 299 },
        { name: 'French Fries', quantity: 1, price: 99 }
      ],
      totalAmount: 697,
      status: 'delivered',
      orderDate: '2024-01-15T18:30:00Z',
      deliveryAddress: '123 Main St, Apt 4B',
      deliveryTime: '20-30 min'
    },
    {
      id: 'ORD002',
      restaurantName: 'Pizza Heaven',
      restaurantImage: 'https://example.com/pizza.jpg',
      items: [
        { name: 'Margherita Pizza', quantity: 1, price: 399 }
      ],
      totalAmount: 399,
      status: 'preparing',
      orderDate: '2024-01-16T19:15:00Z',
      deliveryAddress: '123 Main St, Apt 4B',
      deliveryTime: '25-35 min'
    }
  ], []);
  
  const currentOrders = useMemo(() => 
    orders.filter((order: Order) => order.status !== 'delivered' && order.status !== 'cancelled'), 
    [orders]
  );
  
  const pastOrders = useMemo(() => 
    orders.filter((order: Order) => order.status === 'delivered' || order.status === 'cancelled'), 
    [orders]
  );
  
  const handleOrderPress = useCallback((orderId: string) => {
    console.log('Order pressed:', orderId);
    // In a real app, navigate to order details
  }, []);
  
  const handleReorder = useCallback((orderId: string) => {
    console.log('Reorder:', orderId);
    // In a real app, add items to cart
  }, []);
  
  const handleTrackOrder = useCallback((orderId: string) => {
    console.log('Track order:', orderId);
    // In a real app, navigate to tracking screen
  }, []);
  
  const handleStartOrdering = useCallback(() => {
    router.push('/explore');
  }, [router]);
  
  if (orders.length === 0) {
    return (
      <EmptyState 
        title="No Orders Yet" 
        description="You haven't placed any orders yet. Start exploring restaurants!" 
        icon="fast-food-outline" 
        buttonTitle="Start Ordering" 
        onButtonPress={handleStartOrdering} 
      />
    );
  }
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="help-circle-outline" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
      
      {currentOrders.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Orders</Text>
          {currentOrders.map((order: Order) => (
            <OrderCard 
              key={order.id} 
              order={order} 
              onPress={() => handleOrderPress(order.id)} 
              onReorder={() => handleReorder(order.id)} 
              onTrackOrder={() => handleTrackOrder(order.id)} 
            />
          ))}
        </View>
      )}
      
      {pastOrders.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Past Orders</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {pastOrders.map((order: Order) => (
            <OrderCard 
              key={order.id} 
              order={order} 
              onPress={() => handleOrderPress(order.id)} 
              onReorder={() => handleReorder(order.id)} 
              showReorder={true} 
            />
          ))}
        </View>
      )}
      
      <Card style={styles.supportCard}>
        <View style={styles.supportContent}>
          <Ionicons name="headset-outline" size={32} color={colors.primary} />
          <View style={styles.supportTextContainer}>
            <Text style={styles.supportTitle}>Need help with your order?</Text>
            <Text style={styles.supportDescription}>Contact our 24/7 customer support</Text>
          </View>
          <Button 
            title="Contact" 
            onPress={() => console.log('Contact support')} 
            variant="outline" 
            size="small" 
          />
        </View>
      </Card>
    </ScrollView>
  );
};

export default OrdersScreen;