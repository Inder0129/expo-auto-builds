import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '../../theme';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
};

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary' }) => {
  const styles = useThemedStyles(createStyles);
  return (
    <TouchableOpacity style={[styles.button, styles[variant]]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
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
    color: '#FFFFFF',
    ...theme.typography.button
  }
});