import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/src/components/ui/button';
import { AuthForm } from '@/src/components/auth/auth-form';
import { SocialLogin } from '@/src/components/auth/social-login';
import { ForgotPasswordLink } from '@/src/components/auth/forgot-password-link';
import { colors } from '@/src/theme/colors';
import { typography } from '@/src/theme/typography';
import { spacing } from '@/src/theme/spacing';
import { useAppDispatch } from '@/src/store/hooks';
import { login } from '@/src/store/slices/auth';
import { LoginCredentials } from '@/src/types/auth';
import { styles } from '@/src/styles/auth';

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = useCallback((field: keyof LoginCredentials, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleLogin = useCallback(async () => {
    if (!credentials.email || !credentials.password) {
      return;
    }

    setLoading(true);
    try {
      await dispatch(login(credentials)).unwrap();
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  }, [credentials, dispatch, router]);

  const handleForgotPassword = useCallback(() => {
    router.push('/forgot-password');
  }, [router]);

  const handleSocialLogin = useCallback((provider: string) => {
    console.log('Social login with:', provider);
  }, []);

  const handleRegister = useCallback(() => {
    router.push('/register');
  }, [router]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <AuthForm
          credentials={credentials}
          onChange={handleInputChange}
          onSubmit={handleLogin}
          loading={loading}
          submitLabel="Sign In"
        />

        <ForgotPasswordLink onPress={handleForgotPassword} />

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.divider} />
        </View>

        <SocialLogin onProviderSelect={handleSocialLogin} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.footerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
