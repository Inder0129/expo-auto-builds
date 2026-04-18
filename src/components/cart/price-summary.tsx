import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';
import { Card } from '@/src/components/ui/card';

export interface PriceSummaryProps {
  subtotal: number;
  deliveryFee: number;
  taxAmount: number;
  total: number;
  style?: any;
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({ 
  subtotal, 
  deliveryFee, 
  taxAmount, 
  total, 
  style 
}) => {
  return (
    <Card style={[styles.container, style]}>
      <Text style={styles.title}>Price Summary</Text>
      
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>${subtotal.toFixed(2)}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Delivery Fee</Text>
        <Text style={styles.value}>${deliveryFee.toFixed(2)}</Text>
      </View>
      
      <View style={styles.row}>
        <Text style={styles.label}>Tax</Text>
        <Text style={styles.value}>${taxAmount.toFixed(2)}</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  label: {
    ...typography.body,
    color: colors.text.secondary,
  },
  value: {
    ...typography.body,
    color: colors.text.primary,
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
    ...typography.bodyBold,
    color: colors.text.primary,
  },
  totalValue: {
    ...typography.h4,
    color: colors.primary.main,
  },
});
