import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors } from '@/src/theme';
import { AuthInput } from '@/src/components/auth/auth-input';
import { ValidationMessage } from '@/src/components/auth/validation-message';
import { RegisterButton } from '@/src/components/auth/register-button';
import { AuthFooter } from '@/src/components/auth/auth-footer';
import { styles } from '@/src/styles/auth';

type Validation = {
  isValid: boolean;
  message: string;
};

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const validateEmail = useCallback((email: string): Validation => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      isValid: emailRegex.test(email),
      message: 'Please enter a valid email address',
    };
  }, []);

  const validatePassword = useCallback((password: string): Validation => {
    return {
      isValid: password.length >= 6,
      message: 'Password must be at least 6 characters',
    };
  }, []);

  const validatePhone = useCallback((phone: string): Validation => {
    return {
      isValid: phone.length >= 10,
      message: 'Phone number must be at least 10 digits',
    };
  }, []);

  const validateConfirmPassword = useCallback((password: string, confirmPassword: string): Validation => {
    return {
      isValid: password === confirmPassword,
      message: 'Passwords do not match',
    };
  }, []);

  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  const phoneValidation = validatePhone(phone);
  const confirmPasswordValidation = validateConfirmPassword(password, confirmPassword);

  const canRegister = useCallback((): boolean => {
    return (
      name.length > 0 &&
      emailValidation.isValid &&
      phoneValidation.isValid &&
      passwordValidation.isValid &&
      confirmPasswordValidation.isValid &&
      termsAccepted
    );
  }, [name, emailValidation, phoneValidation, passwordValidation, confirmPasswordValidation, termsAccepted]);

  const handleRegister = useCallback(() => {
    if (!canRegister()) {
      alert('Please fill all fields correctly');
      return;
    }
    router.replace('/(tabs)');
  }, [canRegister, router]);

  const handleLogin = useCallback(() => {
    router.push('/login');
  }, [router]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Stack.Screen options={{ title: 'Create Account' }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>

        <View style={styles.form}>
          <AuthInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            icon="person-outline"
          />

          <AuthInput
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
          />
          {email.length > 0 && !emailValidation.isValid && (
            <ValidationMessage message={emailValidation.message} />
          )}

          <AuthInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            icon="call-outline"
          />
          {phone.length > 0 && !phoneValidation.isValid && (
            <ValidationMessage message={phoneValidation.message} />
          )}

          <AuthInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon="lock-closed-outline"
          />
          {password.length > 0 && !passwordValidation.isValid && (
            <ValidationMessage message={passwordValidation.message} />
          )}

          <AuthInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            icon="lock-closed-outline"
          />
          {confirmPassword.length > 0 && !confirmPasswordValidation.isValid && (
            <ValidationMessage message={confirmPasswordValidation.message} />
          )}

          <TouchableOpacity
            style={styles.termsContainer}
            onPress={() => setTermsAccepted(!termsAccepted)}
          >
            <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
              {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.termsText}>
              I agree to the Terms of Service and Privacy Policy
            </Text>
          </TouchableOpacity>

          <RegisterButton
            onPress={handleRegister}
            disabled={!canRegister()}
          />
        </View>

        <AuthFooter
          text="Already have an account?"
          linkText="Sign In"
          onPress={handleLogin}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
