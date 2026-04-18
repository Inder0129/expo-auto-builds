import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const {
    title,
    onPress,
    style,
    textStyle,
    size = 'medium',
    variant = 'primary',
    disabled = false,
    loading = false,
  } = props;

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return { paddingVertical: spacing.xs, paddingHorizontal: spacing.sm };
      case 'large':
        return { paddingVertical: spacing.md, paddingHorizontal: spacing.xl };
      default:
        return { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg };
    }
  };

  const getVariantStyle = (): { container: ViewStyle; text: TextStyle } => {
    switch (variant) {
      case 'secondary':
        return {
          container: { backgroundColor: colors.secondary },
          text: { color: colors.white },
        };
      case 'outline':
        return {
          container: { backgroundColor: colors.transparent, borderWidth: 1, borderColor: colors.primary },
          text: { color: colors.primary },
        };
      case 'text':
        return {
          container: { backgroundColor: colors.transparent },
          text: { color: colors.primary },
        };
      default:
        return {
          container: { backgroundColor: colors.primary },
          text: { color: colors.white },
        };
    }
  };

  const sizeStyle = getSizeStyle();
  const variantStyle = getVariantStyle();

  return (
    <TouchableOpacity
      style={[
        {
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
        },
        sizeStyle,
        variantStyle.container,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variantStyle.text.color} />
      ) : (
        <Text
          style={[
            {
              fontSize: typography.fontSize.md,
              fontWeight: typography.fontWeight.medium,
            },
            variantStyle.text,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export { Button };