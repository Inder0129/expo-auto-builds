import React, { useState, useCallback } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import { AuthForm } from '@/src/components/auth/auth-form';
import { SocialLogin } from '@/src/components/auth/social-login';
import { ForgotPasswordLink } from '@/src/components/auth/forgot-password-link';
import { Button } from '@/src/components/ui/button';
import { useAppDispatch } from '@/src/store/hooks';
import { login } from '@/src/store/slices/auth';
import { colors } from '@/src/theme/colors';
import { typography } from '@/src/theme/typography';
import { spacing } from '@/src/theme/spacing';
import { authStyles } from '@/src/styles/auth';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = useCallback(async (data: LoginFormData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch(login({ 
        email: data.email, 
        name: 'User', 
        token: 'fake-jwt-token' 
      }));
      
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  }, [dispatch, router]);

  const handleSocialLogin = useCallback((provider: string) => {
    Alert.alert('Social Login', `Login with ${provider} would be implemented here`);
  }, []);

  const handleForgotPassword = useCallback(() => {
    Alert.alert('Forgot Password', 'Password reset flow would start here');
  }, []);

  const handleRegister = useCallback(() => {
    router.push('/register');
  }, [router]);

  return (
    <View style={authStyles.container}>
      <Stack.Screen options={{ title: 'Login', headerShown: false }} />
      
      <View style={authStyles.header}>
        <Text style={authStyles.title}>Welcome Back</Text>
        <Text style={authStyles.subtitle}>Sign in to continue</Text>
      </View>
      
      <AuthForm
        type="login"
        onSubmit={handleLogin}
        loading={loading}
      />
      
      <ForgotPasswordLink onPress={handleForgotPassword} />
      
      <View style={authStyles.dividerContainer}>
        <View style={authStyles.divider} />
        <Text style={authStyles.dividerText}>OR</Text>
        <View style={authStyles.divider} />
      </View>
      
      <SocialLogin onProviderSelect={handleSocialLogin} />
      
      <View style={authStyles.footer}>
        <Text style={authStyles.footerText}>Don't have an account? </Text>
        <Link href="/register" style={authStyles.footerLink}>
          <Text style={authStyles.footerLinkText}>Sign Up</Text>
        </Link>
      </View>
    </View>
  );
}
