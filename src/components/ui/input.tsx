import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useThemedStyles } from '../../theme';

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export const Input: React.FC<InputProps> = ({ value, onChangeText, placeholder }) => {
  const styles = useThemedStyles(createStyles);
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={styles.placeholder.color}
    />
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 8,
    padding: theme.spacing.sm,
    ...theme.typography.body,
    color: theme.colors.text
  },
  placeholder: {
    color: theme.colors.textSecondary
  }
});