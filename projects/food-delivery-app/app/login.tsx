import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/src/theme';
import { LoginForm } from '@/src/components/auth/login-form';
import { SocialLogin } from '@/src/components/auth/social-login';
import { RegisterLink } from '@/src/components/auth/register-link';
import { authStyles } from '@/src/styles/auth';

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const handleLogin = useCallback((data: LoginFormData) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, dispatch login action to store
      console.log('Login with:', data);
      router.replace('/(tabs)');
    }, 1500);
  }, [router]);
  
  const handleSocialLogin = useCallback((provider: 'google' | 'facebook' | 'apple') => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      setIsLoading(false);
      console.log('Social login with:', provider);
      router.replace('/(tabs)');
    }, 1500);
  }, [router]);
  
  const handleRegister = useCallback(() => {
    router.push('/register');
  }, [router]);
  
  const handleForgotPassword = useCallback(() => {
    router.push('/forgot-password');
  }, [router]);
  
  return (
    <SafeAreaView style={authStyles.container} edges={['bottom']}>
      <KeyboardAvoidingView 
        style={authStyles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={authStyles.content}>
          <Text style={authStyles.title}>Welcome Back</Text>
          <Text style={authStyles.subtitle}>Sign in to continue</Text>
          
          <LoginForm 
            onSubmit={handleLogin}
            isLoading={isLoading}
            onForgotPassword={handleForgotPassword}
          />
          
          <View style={authStyles.dividerContainer}>
            <View style={authStyles.divider} />
            <Text style={authStyles.dividerText}>or continue with</Text>
            <View style={authStyles.divider} />
          </View>
          
          <SocialLogin 
            onLogin={handleSocialLogin}
            isLoading={isLoading}
          />
          
          <RegisterLink 
            onPress={handleRegister}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
