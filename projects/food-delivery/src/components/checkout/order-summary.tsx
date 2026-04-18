import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface OrderSummaryProps {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  style?: any;
}

export function OrderSummary(props: OrderSummaryProps) {
  const { items, totalAmount, style } = props;

  const deliveryFee = 40;
  const tax = useMemo((): number => {
    return totalAmount * 0.05;
  }, [totalAmount]);

  const subtotal = useMemo((): number => {
    return totalAmount + deliveryFee + tax;
  }, [totalAmount, deliveryFee, tax]);

  const renderItem = useCallback(({ item }: { item: OrderSummaryProps['items'][0] }) => {
    return (
      <View style={styles.itemRow}>
        <Text style={styles.itemName} numberOfLines={1}>
          {item.name} x {item.quantity}
        </Text>
        <Text style={styles.itemPrice}>₹{(item.price * item.quantity).toFixed(2)}</Text>
      </View>
    );
  }, []);

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item: OrderSummaryProps['items'][0]) => item.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      
      <View style={styles.summarySection}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Items Total</Text>
          <Text style={styles.summaryValue}>₹{totalAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryValue}>₹{deliveryFee.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax (5%)</Text>
          <Text style={styles.summaryValue}>₹{tax.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal</Text>
          <Text style={styles.totalValue}>₹{subtotal.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm
  },
  itemName: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
    flex: 1,
    marginRight: spacing.md
  },
  itemPrice: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary
  },
  separator: {
    height: 1,
    backgroundColor: colors.border
  },
  summarySection: {
    gap: spacing.sm
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  summaryLabel: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary
  },
  summaryValue: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border
  },
  totalLabel: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text.primary
  },
  totalValue: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary
  }
});
