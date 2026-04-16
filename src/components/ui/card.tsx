import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemedStyles } from '../../theme';

export interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  const styles = useThemedStyles(createStyles);
  
  return <View style={styles.card}>{children}</View>;
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: theme.spacing.md,
      margin: theme.spacing.sm
    }
  });
