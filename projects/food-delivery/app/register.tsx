import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/src/components/ui/button';
import { AuthForm } from '@/src/components/auth/auth-form';
import { TermsCheckbox } from '@/src/components/auth/terms-checkbox';
import { SocialRegister } from '@/src/components/auth/social-register';
import { colors } from '@/src/theme/colors';
import { typography } from '@/src/theme/typography';
import { spacing } from '@/src/theme/spacing';
import { useAppDispatch } from '@/src/store/hooks';
import { register } from '@/src/store/slices/auth';
import { RegisterCredentials } from '@/src/types/auth';
import { styles } from '@/src/styles/auth';

export default function RegisterScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [credentials, setCredentials] = useState<RegisterCredentials>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = useCallback((field: keyof RegisterCredentials, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleRegister = useCallback(async () => {
    if (!credentials.name || !credentials.email || !credentials.password || !credentials.confirmPassword) {
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      return;
    }

    if (!acceptedTerms) {
      return;
    }

    setLoading(true);
    try {
      await dispatch(register(credentials)).unwrap();
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  }, [credentials, acceptedTerms, dispatch, router]);

  const handleSocialRegister = useCallback((provider: string) => {
    console.log('Social register with:', provider);
  }, []);

  const handleLogin = useCallback(() => {
    router.push('/login');
  }, [router]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>

        <AuthForm
          credentials={credentials}
          onChange={handleInputChange}
          onSubmit={handleRegister}
          loading={loading}
          submitLabel="Sign Up"
          isRegister={true}
        />

        <TermsCheckbox
          accepted={acceptedTerms}
          onToggle={() => setAcceptedTerms(!acceptedTerms)}
        />

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or sign up with</Text>
          <View style={styles.divider} />
        </View>

        <SocialRegister onProviderSelect={handleSocialRegister} />

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
