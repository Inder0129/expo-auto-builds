import React from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet, PressableProps } from 'react-native';
import { useThemedStyles, moderateScaleFactor, spacing, fontSize } from '@/theme';

type ButtonProps = PressableProps & {
  title: string;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  disabled?: boolean;
  style?: any;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  ...props
}) => {
  const themedStyles = useThemedStyles();
  
  const baseStyle = [
    styles.base,
    variant === 'primary' ? styles.primary : styles.secondary,
    (disabled || loading) && styles.disabled,
    style,
  ];
  
  const textStyle = [
    styles.text,
    variant === 'primary' ? styles.textPrimary : styles.textSecondary,
    (disabled || loading) && styles.textDisabled,
  ];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={baseStyle}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#ffffff' : '#007AFF'}
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: moderateScaleFactor(8),
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: moderateScaleFactor(44),
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  textPrimary: {
    color: '#ffffff',
  },
  textSecondary: {
    color: '#007AFF',
  },
  textDisabled: {
    color: '#ccc',
  },
});