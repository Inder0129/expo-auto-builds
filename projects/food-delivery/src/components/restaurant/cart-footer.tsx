import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

export interface CartFooterProps {
  itemCount: number;
  total: number;
  onViewCart: () => void;
}

export const CartFooter: React.FC<CartFooterProps> = ({ itemCount, total, onViewCart }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.cartInfo}>
          <Ionicons name="cart" size={24} color={colors.primary} />
          <Text style={styles.itemCount}>{itemCount} items</Text>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.total}>${total.toFixed(2)}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onViewCart} style={styles.button}>
        <Text style={styles.buttonText}>View Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.md,
  },
  content: {
    flex: 1,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    marginRight: spacing.md,
  },
  cartInfo: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  itemCount: {
    ...typography.body,
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
  totalContainer: {
    alignItems: 'flex-end' as const,
  },
  totalLabel: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  total: {
    ...typography.h4,
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  buttonText: {
    ...typography.button,
    color: colors.text.inverse,
  },
};
