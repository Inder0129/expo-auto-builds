import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import { AuthForm } from '@/src/components/auth/auth-form';
import { SocialLogin } from '@/src/components/auth/social-login';
import { ForgotPasswordLink } from '@/src/components/auth/forgot-password-link';
import { colors, spacing, typography } from '@/src/theme';
import { styles } from '@/src/styles/auth';

type LoginScreenProps = {};

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginScreen(props: LoginScreenProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = useCallback((data: LoginFormData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  }, [router]);

  const handleSocialLogin = useCallback((provider: string) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  }, [router]);

  const handleForgotPassword = useCallback(() => {
    router.push('/forgot-password');
  }, [router]);

  const handleRegister = useCallback(() => {
    router.push('/register');
  }, [router]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <AuthForm
          type="login"
          onSubmit={handleLogin}
          isLoading={isLoading}
          style={styles.form}
        />

        <ForgotPasswordLink onPress={handleForgotPassword} style={styles.forgotLink} />

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>

        <SocialLogin onSocialLogin={handleSocialLogin} style={styles.socialLogin} />

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
