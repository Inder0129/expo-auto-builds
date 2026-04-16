import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemedStyles } from '@/theme';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
};

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium'
}) => {
  const styles = useThemedStyles(createStyles);
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        styles[size]
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.text,
        styles[`${variant}Text`]
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primary: {
    backgroundColor: theme.colors.primary
  },
  secondary: {
    backgroundColor: theme.colors.secondary
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary
  },
  small: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm
  },
  medium: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md
  },
  large: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg
  },
  text: {
    fontSize: theme.typography.body.fontSize,
    fontWeight: '600'
  },
  primaryText: {
    color: '#FFFFFF'
  },
  secondaryText: {
    color: '#FFFFFF'
  },
  outlineText: {
    color: theme.colors.primary
  }
});