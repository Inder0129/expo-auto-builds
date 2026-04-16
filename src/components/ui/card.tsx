import React from 'react';
import { View, ViewProps } from 'react-native';
import { useThemedStyles } from '../../theme';

type CardProps = ViewProps;

export function Card({ style, ...props }: CardProps) {
  const styles = useThemedStyles((theme) => ({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: theme.spacing.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3
    }
  }));

  return <View style={[styles.card, style]} {...props} />;
}
