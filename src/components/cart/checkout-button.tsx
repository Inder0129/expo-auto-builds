import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface Props {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: any;
}

export const CheckoutButton: React.FC<Props> = ({ onPress, disabled, loading, style }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        disabled && styles.disabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.text}>Proceed to Checkout</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: spacing.md,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: colors.disabled,
  },
  text: {
    ...typography.button,
    color: colors.white,
  },
});
