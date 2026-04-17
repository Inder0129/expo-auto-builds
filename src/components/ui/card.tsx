import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemedStyles } from '../../theme';

type CardProps = {
  children: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ children }) => {
  const styles = useThemedStyles((theme) => ({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: theme.spacing.md,
      margin: theme.spacing.sm
    }
  }));

  return <View style={styles.card}>{children}</View>;
};