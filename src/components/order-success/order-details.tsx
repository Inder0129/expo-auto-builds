import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';

interface Order {
  id: string;
  total: string;
  estimatedTime: string;
}

interface Props {
  order: Order;
}

export const OrderDetails: React.FC<Props> = ({ order }) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Order ID:</Text>
        <Text style={styles.value}>{order.id}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total Amount:</Text>
        <Text style={styles.value}>{order.total}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Estimated Delivery:</Text>
        <Text style={styles.value}>{order.estimatedTime} minutes</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    width: '100%',
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  label: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
  },
  value: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semiBold,
    color: colors.text.primary,
  },
});
