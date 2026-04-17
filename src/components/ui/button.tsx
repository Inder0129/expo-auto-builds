import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const variant = props.variant || 'primary';
  const size = props.size || 'medium';
  const disabled = props.disabled || false;
  const loading = props.loading || false;

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    const sizeStyle: ViewStyle = {
      paddingHorizontal: size === 'small' ? spacing.md : size === 'large' ? spacing.xl : spacing.lg,
      paddingVertical: size === 'small' ? spacing.sm : size === 'large' ? spacing.lg : spacing.md,
    };

    const variantStyle: ViewStyle = {
      backgroundColor: variant === 'primary' ? colors.primary : variant === 'secondary' ? colors.secondary : 'transparent',
      borderWidth: variant === 'outline' ? 1 : 0,
      borderColor: variant === 'outline' ? colors.primary : undefined,
    };

    const disabledStyle: ViewStyle = disabled ? { opacity: 0.5 } : {};

    return { ...baseStyle, ...sizeStyle, ...variantStyle, ...disabledStyle, ...props.style };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: size === 'small' ? typography.fontSize.sm : size === 'large' ? typography.fontSize.lg : typography.fontSize.md,
      fontWeight: typography.fontWeight.medium,
    };

    const variantStyle: TextStyle = {
      color: variant === 'primary' || variant === 'secondary' ? colors.white : colors.primary,
    };

    return { ...baseStyle, ...variantStyle, ...props.textStyle };
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={props.onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'primary' || variant === 'secondary' ? colors.white : colors.primary} />
      ) : (
        <Text style={getTextStyle()}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;