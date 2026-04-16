import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemedStyles } from '@/theme';

type CardProps = {
  children: React.ReactNode;
  elevation?: number;
};

export const Card: React.FC<CardProps> = ({ children, elevation = 1 }) => {
  const styles = useThemedStyles(createStyles);
  
  return (
    <View style={[
      styles.card,
      elevation === 2 && styles.elevation2,
      elevation === 3 && styles.elevation3
    ]}>
      {children}
    </View>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },
  elevation2: {
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2
  },
  elevation3: {
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3
  }
});