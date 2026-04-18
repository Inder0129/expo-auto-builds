import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface Props {
  title: string;
  children: React.ReactNode;
  style?: any;
}

export const MenuSection: React.FC<Props> = ({ title, children, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.itemsContainer}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  itemsContainer: {
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
    overflow: 'hidden',
  },
});
