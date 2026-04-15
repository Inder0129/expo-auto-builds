import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useThemedStyles, moderateScaleFactor, spacing, fontSize } from '@/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant: 'primary' | 'secondary';
  loading: boolean;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, variant, loading }) => {
  const styles = useThemedStyles();
  const scaleFactor = moderateScaleFactor();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary,
      ]}
      onPress={onPress}
      disabled={loading}
    >
      <Text
        style={[
          styles.buttonText,
          variant === 'primary' ? styles.buttonTextPrimary : styles.buttonTextSecondary,
        ]}
      >
        {loading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;