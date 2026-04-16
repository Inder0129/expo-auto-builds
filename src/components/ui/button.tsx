import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '../../theme';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ title, onPress, variant = 'primary' }: ButtonProps) {
  const styles = useThemedStyles(createStyles);
  
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant]]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    button: {
      padding: theme.spacing.md,
      borderRadius: 8,
      alignItems: 'center'
    },
    primary: {
      backgroundColor: theme.colors.primary
    },
    secondary: {
      backgroundColor: theme.colors.secondary
    },
    text: {
      color: theme.colors.background,
      ...theme.typography.body
    }
  });
