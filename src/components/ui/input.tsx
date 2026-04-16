import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useThemedStyles } from '@/theme';

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  autoFocus?: boolean;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  autoFocus = false
}) => {
  const theme = useThemedStyles();
  
  return (
    <TextInput
      style={[
        styles.input,
        {
          backgroundColor: theme.colors.surface,
          color: theme.colors.text,
          borderColor: theme.colors.border,
          borderRadius: theme.spacing.sm,
          padding: theme.spacing.md
        }
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.textSecondary}
      keyboardType={keyboardType}
      autoFocus={autoFocus}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    fontSize: 16
  }
});