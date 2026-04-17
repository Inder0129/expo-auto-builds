import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';
import { Order } from '@/src/store/slices/orders';

type OrderHistoryListProps = {
  orders: Order[];
  onReorder: (orderId: string) => void;
  onOrderPress: (orderId: string) => void;
};

export default function OrderHistoryList({
  orders,
  onReorder,
  onOrderPress,
}: OrderHistoryListProps) {
  const renderOrder = useCallback(({ item }: { item: Order }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => onOrderPress(item.id)}
    >
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.restaurantName}>{item.restaurantName}</Text>
          <Text style={styles.orderDate}>{item.date}</Text>
        </View>
        <View style={styles.orderStatusContainer}>
          <Text style={styles.orderStatus}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.orderItems}>
        <Text style={styles.orderItemsText} numberOfLines={1}>
          {item.items.map(item => item.name).join(', ')}
        </Text>
        <Text style={styles.orderAmount}>₹{item.totalAmount}</Text>
      </View>
      
      <TouchableOpacity
        style={styles.reorderButton}
        onPress={() => onReorder(item.id)}
      >
        <Ionicons name="refresh" size={16} color={colors.primary} />
        <Text style={styles.reorderText}>Reorder</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  ), [onOrderPress, onReorder]);

  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="receipt-outline" size={48} color={colors.text.secondary} />
        <Text style={styles.emptyText}>No past orders</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={renderOrder}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
    />
  );
}

const styles = {
  orderCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  orderHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    marginBottom: spacing.sm,
  },
  restaurantName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600' as const,
    marginBottom: spacing.xs,
  },
  orderDate: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  orderStatusContainer: {
    backgroundColor: colors.success.light,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  orderStatus: {
    ...typography.caption,
    color: colors.success.dark,
    fontWeight: '600' as const,
  },
  orderItems: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: spacing.md,
  },
  orderItemsText: {
    ...typography.body,
    color: colors.text.secondary,
    flex: 1,
    marginRight: spacing.sm,
  },
  orderAmount: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600' as const,
  },
  reorderButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    alignSelf: 'flex-start' as const,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  reorderText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600' as const,
    marginLeft: spacing.xs,
  },
  emptyContainer: {
    alignItems: 'center' as const,
    paddingVertical: spacing.xl * 2,
  },
  emptyText: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.md,
  },
};
