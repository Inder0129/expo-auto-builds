import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface Props {
  style?: any;
}

export const EmptyCart: React.FC<Props> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <MaterialCommunityIcons name="cart-outline" size={80} color={colors.text.secondary} />
      <Text style={styles.title}>Your cart is empty</Text>
      <Text style={styles.subtitle}>Add items from restaurants to get started</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
