import React, { useCallback } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from '@/src/components/ui/button';
import { colors } from '@/src/theme/colors';
import { typography } from '@/src/theme/typography';
import { spacing } from '@/src/theme/spacing';
import { LoginCredentials, RegisterCredentials } from '@/src/types/auth';

interface AuthFormProps {
  credentials: LoginCredentials | RegisterCredentials;
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  submitLabel: string;
  isRegister?: boolean;
  style?: ViewStyle;
}

export const AuthForm: React.FC<AuthFormProps> = (props: AuthFormProps) => {
  const { credentials, onChange, onSubmit, loading, submitLabel, isRegister = false, style } = props;

  const handleChange = useCallback((field: string) => (value: string) => {
    onChange(field, value);
  }, [onChange]);

  return (
    <View style={[styles.container, style]}>
      {isRegister && 'name' in credentials && (
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={credentials.name}
          onChangeText={handleChange('name')}
          autoCapitalize="words"
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={credentials.email}
        onChangeText={handleChange('email')}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={credentials.password}
        onChangeText={handleChange('password')}
        secureTextEntry
      />

      {isRegister && 'confirmPassword' in credentials && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={credentials.confirmPassword}
          onChangeText={handleChange('confirmPassword')}
          secureTextEntry
        />
      )}

      <Button
        title={submitLabel}
        onPress={onSubmit}
        loading={loading}
        disabled={loading}
        variant="primary"
        style={styles.submitButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    ...typography.body,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
    color: colors.text.primary,
  },
  submitButton: {
    marginTop: spacing.sm,
  },
});
