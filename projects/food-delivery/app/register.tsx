import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import { AuthForm } from '@/src/components/auth/auth-form';
import { TermsCheckbox } from '@/src/components/auth/terms-checkbox';
import { SocialRegister } from '@/src/components/auth/social-register';
import { colors, spacing, typography } from '@/src/theme';
import { styles } from '@/src/styles/auth';

type RegisterScreenProps = {};

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen(props: RegisterScreenProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  const handleRegister = useCallback((data: RegisterFormData) => {
    if (!acceptedTerms) {
      alert('Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  }, [acceptedTerms, router]);

  const handleSocialRegister = useCallback((provider: string) => {
    setIsLoading(true);
    // Simulate social registration
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(tabs)');
    }, 1500);
  }, [router]);

  const handleLogin = useCallback(() => {
    router.push('/login');
  }, [router]);

  const toggleTerms = useCallback(() => {
    setAcceptedTerms((prev) => !prev);
  }, []);

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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>

        <AuthForm
          type="register"
          onSubmit={handleRegister}
          isLoading={isLoading}
          style={styles.form}
        />

        <TermsCheckbox
          checked={acceptedTerms}
          onToggle={toggleTerms}
          style={styles.termsCheckbox}
        />

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>

        <SocialRegister onSocialRegister={handleSocialRegister} style={styles.socialRegister} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
