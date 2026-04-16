import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useThemedStyles } from '@/theme';

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address';
};

export const Input: React.FC<InputProps> = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default'
}) => {
  const styles = useThemedStyles(createStyles);
  
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      placeholderTextColor={styles.placeholder.color}
    />
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.divider,
    borderRadius: 8,
    padding: theme.spacing.sm,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text
  },
  placeholder: {
    color: theme.colors.textSecondary
  }
});