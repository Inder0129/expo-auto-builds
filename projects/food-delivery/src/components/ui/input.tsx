import React from 'react';
import {
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface InputProps extends TextInputProps {
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  return (
    <TextInput
      style={[styles.input, props.inputStyle]}
      placeholderTextColor={colors.gray}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...typography.body,
    color: colors.text,
  },
});

export { Input };