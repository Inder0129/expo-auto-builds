import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemedStyles } from '@/theme';

type CardProps = {
  children: React.ReactNode;
  elevation?: number;
};

export const Card: React.FC<CardProps> = ({ children, elevation = 1 }) => {
  const theme = useThemedStyles();
  
  return (
    <View style={[
      styles.card,
      {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.spacing.md,
        padding: theme.spacing.md,
        shadowColor: theme.colors.text,
        shadowOffset: { width: 0, height: elevation },
        shadowOpacity: 0.1,
        shadowRadius: elevation * 2
      }
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8
  }
});