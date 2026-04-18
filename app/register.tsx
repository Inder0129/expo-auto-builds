import React, { useState, useCallback } from 'react';
import { View, Text, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Button } from '@/src/components/ui';
import { AuthForm } from '@/src/components/auth/auth-form';
import { SocialLoginButtons } from '@/src/components/auth/social-login-buttons';
import { colors, spacing, typography } from '@/src/theme';
import { authStyles } from '@/src/styles/auth';

interface RegisterScreenProps {}

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterScreen(props: RegisterScreenProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = useCallback((field: keyof RegisterFormData, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleRegister = useCallback(async (): Promise<void> => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Account created successfully!');
      router.push('/(tabs)');
    }, 1000);
  }, [formData, router]);

  const handleSocialLogin = useCallback((provider: string): void => {
    Alert.alert('Social Login', `Registering with ${provider}`);
    // Implement social registration logic here
  }, []);

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.title}>Create Account</Text>
      <Text style={authStyles.subtitle}>Sign up to get started</Text>
      
      <AuthForm
        formData={formData}
        onInputChange={handleInputChange}
        isLogin={false}
      />
      
      <Button
        title={isLoading ? 'Creating Account...' : 'Sign Up'}
        onPress={handleRegister}
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
        <Text style={authStyles.footerText}>Already have an account? </Text>
        <Link href="/login" style={authStyles.linkText}>Login</Link>
      </View>
    </View>
  );
}
