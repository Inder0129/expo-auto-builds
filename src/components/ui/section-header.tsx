import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScaleFactor, spacing, fontSize } from '@/theme';

type SectionHeaderProps = {
  title: string;
  style?: any;
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
  },
});