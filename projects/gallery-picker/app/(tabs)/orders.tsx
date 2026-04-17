import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { typography } from '../../src/theme/typography';
import { Button } from '../../src/components/ui/Button';
import { Card } from '../../src/components/ui/Card';

export default function OrdersScreen() {
  const orders = [
    { id: '1', restaurant: 'Pasta Palace', status: 'delivered', date: 'Today, 2:30 PM', total: '$24.99' },
    { id: '2', restaurant: 'Taco Town', status: 'preparing', date: 'Yesterday, 7:15 PM', total: '$18.50' },
    { id: '3', restaurant: 'Dragon Garden', status: 'delivered', date: 'Oct 12, 1:45 PM', total: '$32.75' },
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'delivered': return colors.success;
      case 'preparing': return colors.warning;
      default: return colors.textSecondary;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <Text style={styles.subtitle}>Track and manage your orders</Text>
      </View>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No orders yet</Text>
          <Text style={styles.emptySubtext}>Start exploring restaurants to place your first order!</Text>
          <Button title="Explore Restaurants" onPress={() => {}} variant="primary" style={styles.exploreButton} />
        </View>
      ) : (
        <ScrollView style={styles.ordersScroll} showsVerticalScrollIndicator={false}>
          {orders.map((order) => (
            <Card key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderRestaurant}>{order.restaurant}</Text>
                <Text style={[styles.orderStatus, { color: getStatusColor(order.status) }]}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Text>
              </View>
              <View style={styles.orderDetails}>
                <Text style={styles.orderDate}>{order.date}</Text>
                <Text style={styles.orderTotal}>{order.total}</Text>
              </View>
              <View style={styles.orderActions}>
                <Button title="Track Order" onPress={() => {}} variant="outline" style={styles.trackButton} />
                <Button title="Reorder" onPress={() => {}} variant="primary" style={styles.reorderButton} />
              </View>
            </Card>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
  },
  header: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyText: {
    ...typography.h2,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  exploreButton: {
    minWidth: 200,
  },
  ordersScroll: {
    flex: 1,
  },
  orderCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  orderRestaurant: {
    ...typography.h3,
    color: colors.text,
  },
  orderStatus: {
    ...typography.caption,
    fontWeight: '600',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  orderDate: {
    ...typography.body,
    color: colors.textSecondary,
  },
  orderTotal: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  orderActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  trackButton: {
    flex: 1,
  },
  reorderButton: {
    flex: 1,
  },
});