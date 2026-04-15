import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScaleFactor, spacing, fontSize } from '@/theme';

type TabHeaderProps = {
  title: string;
  rightAction?: React.ReactNode;
  style?: any;
};

export const TabHeader: React.FC<TabHeaderProps> = ({ title, rightAction, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
      {rightAction && <View style={styles.rightAction}>{rightAction}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: '#000',
  },
  rightAction: {
    marginLeft: spacing.sm,
  },
});