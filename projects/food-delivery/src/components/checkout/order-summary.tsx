import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  style?: ViewStyle;
}

export const OrderSummary: React.FC<OrderSummaryProps> = (props: OrderSummaryProps) => {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>${props.subtotal.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Delivery Fee</Text>
        <Text style={styles.value}>${props.deliveryFee.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Tax</Text>
        <Text style={styles.value}>${props.tax.toFixed(2)}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${props.total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.body,
    color: colors.textSecondary,
  },
  value: {
    ...typography.body,
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
  totalValue: {
    ...typography.heading,
    color: colors.primary,
  },
});
