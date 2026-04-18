import React, { useCallback } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface AuthFormProps {
  formData: {
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
  };
  onInputChange: (field: keyof AuthFormProps['formData'], value: string) => void;
  isLogin: boolean;
  style?: any;
}

export function AuthForm(props: AuthFormProps) {
  const { formData, onInputChange, isLogin, style } = props;
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState<boolean>(false);

  const handleChange = useCallback((field: keyof AuthFormProps['formData']) => {
    return (value: string): void => {
      onInputChange(field, value);
    };
  }, [onInputChange]);

  const togglePasswordVisibility = useCallback((): void => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const toggleConfirmPasswordVisibility = useCallback((): void => {
    setShowConfirmPassword(!showConfirmPassword);
  }, [showConfirmPassword]);

  return (
    <View style={[styles.container, style]}>
      {!isLogin && (
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color={colors.text.secondary} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={formData.name || ''}
            onChangeText={handleChange('name')}
            placeholderTextColor={colors.text.tertiary}
            autoCapitalize="words"
          />
        </View>
      )}
      
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color={colors.text.secondary} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={formData.email}
          onChangeText={handleChange('email')}
          placeholderTextColor={colors.text.tertiary}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color={colors.text.secondary} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={handleChange('password')}
          placeholderTextColor={colors.text.tertiary}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={colors.text.secondary}
          />
        </TouchableOpacity>
      </View>
      
      {!isLogin && (
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.text.secondary} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={formData.confirmPassword || ''}
            onChangeText={handleChange('confirmPassword')}
            placeholderTextColor={colors.text.tertiary}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.eyeIcon}>
            <Ionicons
              name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={colors.text.secondary}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border
  },
  icon: {
    marginLeft: spacing.md
  },
  input: {
    flex: 1,
    padding: spacing.md,
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary
  },
  eyeIcon: {
    padding: spacing.md
  }
});
