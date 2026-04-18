import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@/src/components/ui/button';
import { colors, spacing, typography } from '@/src/theme';

interface PlaceOrderButtonProps {
  onPress: () => void;
  disabled: boolean;
  total: number;
  style?: ViewStyle;
}

export const PlaceOrderButton: React.FC<PlaceOrderButtonProps> = (props: PlaceOrderButtonProps) => {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalAmount}>${props.total.toFixed(2)}</Text>
      </View>
      <Button
        title="Place Order"
        onPress={props.onPress}
        variant="primary"
        size="large"
        disabled={props.disabled}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  totalAmount: {
    ...typography.heading,
    color: colors.primary,
  },
  button: {
    flex: 2,
    marginLeft: spacing.md,
  },
});
