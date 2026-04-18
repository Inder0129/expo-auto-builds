import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface EmptyStateProps {
  onAddAddress: () => void;
  style?: ViewStyle;
}

export function EmptyState(props: EmptyStateProps) {
  const { onAddAddress, style } = props;

  const handleAddAddress = useCallback(() => {
    onAddAddress?.();
  }, [onAddAddress]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Ionicons name="location-outline" size={64} color={colors.text.secondary} />
      </View>
      <Text style={styles.title}>No Addresses Yet</Text>
      <Text style={styles.description}>
        Add your delivery addresses to get started with food delivery
      </Text>
      <TouchableOpacity onPress={handleAddAddress} style={styles.button}>
        <Ionicons name="add" size={20} color={colors.white} />
        <Text style={styles.buttonText}>Add Your First Address</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  iconContainer: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  description: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  button: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 12,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    ...typography.button,
    color: colors.white,
    marginLeft: spacing.sm,
  },
});
