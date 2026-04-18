import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const buttonSize = {
    small: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.sm,
    },
    medium: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
    },
    large: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
    },
  }[props.size || 'medium'];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonSize,
        props.style,
        props.disabled && styles.disabled,
      ]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <Text style={[styles.text, props.textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    ...typography.body,
    fontWeight: '600',
  },
  disabled: {
    backgroundColor: colors.grayLight,
  },
});

export { Button };