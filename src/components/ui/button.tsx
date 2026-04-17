import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '../../theme';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
};

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary' }) => {
  const styles = useThemedStyles((theme) => ({
    button: {
      backgroundColor: variant === 'primary' ? theme.colors.primary : theme.colors.surface,
      padding: theme.spacing.md,
      borderRadius: 8,
      alignItems: 'center'
    },
    text: {
      color: variant === 'primary' ? '#FFFFFF' : theme.colors.text,
      ...theme.typography.body
    }
  }));

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};