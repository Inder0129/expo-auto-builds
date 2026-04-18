import React from 'react';
import { View, ViewStyle } from 'react-native';
import { colors, spacing } from '@/src/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevation?: number;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { children, style, elevation = 2 } = props;

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: 8,
          padding: spacing.md,
          shadowColor: colors.black,
          shadowOffset: { width: 0, height: elevation },
          shadowOpacity: 0.1,
          shadowRadius: elevation * 2,
          elevation,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export { Card };