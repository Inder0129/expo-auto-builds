import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Button } from '@/src/components/ui';
import { AuthForm } from '@/src/components/auth/auth-form';
import { SocialLoginButtons } from '@/src/components/auth/social-login-buttons';
import { colors, spacing, typography } from '@/src/theme';
import { authStyles } from '@/src/styles/auth';

interface LoginScreenProps {}

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginScreen(props: LoginScreenProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = useCallback((field: keyof LoginFormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleLogin = useCallback(async (): Promise<void> => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Logged in successfully!');
      router.push('/(tabs)');
    }, 1000);
  }, [formData, router]);

  const handleSocialLogin = useCallback((provider: string): void => {
    Alert.alert('Social Login', `Logging in with ${provider}`);
    // Implement social login logic here
  }, []);

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Welcome Back</Text>
      <Text style={authStyles.subtitle}>Sign in to continue</Text>
      
      <AuthForm
        formData={formData}
        onInputChange={handleInputChange}
        isLogin={true}
      />
      
      <Button
        title={isLoading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        style={authStyles.submitButton}
        disabled={isLoading}
      />
      
      <View style={authStyles.dividerContainer}>
        <View style={authStyles.divider} />
        <Text style={authStyles.dividerText}>OR</Text>
        <View style={authStyles.divider} />
      </View>
      
      <SocialLoginButtons onSocialLogin={handleSocialLogin} />
      
      <View style={authStyles.footer}>
        <Text style={authStyles.footerText}>Don't have an account? </Text>
        <Link href="/register" style={authStyles.linkText}>Sign Up</Link>
      </View>
      
      <View style={authStyles.footer}>
        <Link href="/forgot-password" style={authStyles.linkText}>Forgot Password?</Link>
      </View>
    </View>
  );
}
