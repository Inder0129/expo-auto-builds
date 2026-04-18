import React, { useCallback } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';

interface Props {
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  onInputChange: (field: keyof Props['formData'], value: string) => void;
}

export const RegisterForm: React.FC<Props> = ({ formData, onInputChange }) => {
  const handleNameChange = useCallback((text: string) => {
    onInputChange('name', text);
  }, [onInputChange]);

  const handleEmailChange = useCallback((text: string) => {
    onInputChange('email', text);
  }, [onInputChange]);

  const handlePasswordChange = useCallback((text: string) => {
    onInputChange('password', text);
  }, [onInputChange]);

  const handleConfirmPasswordChange = useCallback((text: string) => {
    onInputChange('confirmPassword', text);
  }, [onInputChange]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={formData.name}
        onChangeText={handleNameChange}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={handlePasswordChange}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChangeText={handleConfirmPasswordChange}
        secureTextEntry
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
