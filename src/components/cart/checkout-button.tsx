import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';

export interface CheckoutButtonProps {
  total: number;
  itemCount: number;
  onPress: () => void;
  style?: any;
}

export const CheckoutButton: React.FC<CheckoutButtonProps> = ({ 
  total, 
  itemCount, 
  onPress, 
  style 
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.summary}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.total}>${total.toFixed(2)}</Text>
        <Text style={styles.itemCount}>({itemCount} {itemCount === 1 ? 'item' : 'items'})</Text>
      </View>
      
      <Button 
        title="Proceed to Checkout" 
        onPress={onPress}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summary: {
    flex: 1,
  },
  totalLabel: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  total: {
    ...typography.h3,
    color: colors.text.primary,
  },
  itemCount: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  button: {
    flex: 1,
    marginLeft: spacing.md,
  },
});
