import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '@/src/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  return <View style={[styles.card, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export { Card };