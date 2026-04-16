import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { useThemedStyles } from '../../theme';

type ButtonProps = TouchableOpacityProps & {
  title: string;
};

export function Button({ title, style, ...props }: ButtonProps) {
  const styles = useThemedStyles((theme) => ({
    button: {
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.md,
      borderRadius: 8,
      alignItems: 'center'
    },
    text: {
      color: 'white',
      ...theme.typography.body
    }
  }));

  return (
    <TouchableOpacity style={[styles.button, style]} {...props}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
