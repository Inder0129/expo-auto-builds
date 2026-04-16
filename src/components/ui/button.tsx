import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useThemedStyles, moderateScaleFactor, spacing, fontSize } from '@/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary', loading = false }) => {
  const styles = useThemedStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary]}
      disabled={loading}
    >
      <Text style={[styles.buttonText, variant === 'primary' ? styles.buttonTextPrimary : styles.buttonTextSecondary]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;