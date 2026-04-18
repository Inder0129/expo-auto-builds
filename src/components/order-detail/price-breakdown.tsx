import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '@/src/components/ui/card';
import { colors } from '@/src/theme';

interface PriceBreakdownProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  subtotal,
  shipping,
  tax,
  total,
}) => {
  const priceRow = (label: string, value: number, isTotal: boolean = false) => (
    <View style={styles.priceRow}>
      <Text style={[
        styles.priceLabel,
        isTotal && styles.totalLabel,
      ]}>
        {label}
      </Text>
      <Text style={[
        styles.priceValue,
        isTotal && styles.totalValue,
      ]}>
        ${value.toFixed(2)}
      </Text>
    </View>
  );
  
  return (
    <Card style={styles.container}>
      <Text style={styles.sectionTitle}>Price Breakdown</Text>
      
      {priceRow('Subtotal', subtotal)}
      {priceRow('Shipping', shipping)}
      {priceRow('Tax', tax)}
      
      <View style={styles.divider} />
      
      {priceRow('Total', total, true)}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    marginTop: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  priceValue: {
    fontSize: 14,
    color: colors.text.primary,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
});
