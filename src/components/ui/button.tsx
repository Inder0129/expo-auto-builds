import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@/theme';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false
}) => {
  const theme = useThemedStyles();
  
  const buttonStyle = {
    backgroundColor: variant === 'primary' ? theme.colors.primary : 
                   variant === 'secondary' ? theme.colors.secondary : 'transparent',
    paddingHorizontal: size === 'small' ? theme.spacing.md : 
                      size === 'large' ? theme.spacing.xl : theme.spacing.lg,
    paddingVertical: size === 'small' ? theme.spacing.sm : 
                    size === 'large' ? theme.spacing.lg : theme.spacing.md,
    borderWidth: variant === 'outline' ? 1 : 0,
    borderColor: variant === 'outline' ? theme.colors.border : undefined
  };
  
  const textStyle = {
    color: variant === 'outline' ? theme.colors.text : '#FFFFFF',
    fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16
  };
  
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: '600'
  },
  disabled: {
    opacity: 0.5
  }
});