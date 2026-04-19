import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';
import { ButtonVariant, ButtonSize } from '@/src/types';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button(props: ButtonProps) {
  const variant = props.variant || 'primary';
  const size = props.size || 'medium';
  const disabled = props.disabled || false;

  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary: {
      backgroundColor: colors.primary,
    },
    secondary: {
      backgroundColor: colors.secondary,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.primary,
    },
  };

  const sizeStyles: Record<ButtonSize, ViewStyle> = {
    small: {
      paddingVertical: spacing.tiny,
      paddingHorizontal: spacing.small,
    },
    medium: {
      paddingVertical: spacing.small,
      paddingHorizontal: spacing.medium,
    },
    large: {
      paddingVertical: spacing.medium,
      paddingHorizontal: spacing.large,
    },
  };

  const textStyles: Record<ButtonVariant, TextStyle> = {
    primary: {
      color: '#FFFFFF',
    },
    secondary: {
      color: '#FFFFFF',
    },
    outline: {
      color: colors.primary,
    },
  };

  const disabledStyle: ViewStyle = disabled ? { opacity: 0.5 } : {};

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles[variant],
        sizeStyles[size],
        disabledStyle,
        props.style,
      ]}
      onPress={props.onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyles[variant]]}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typography.body,
    fontWeight: '600',
  },
});