import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { AuthInput } from '@/src/components/auth/auth-input';
import { SocialButton } from '@/src/components/auth/social-button';
import { PasswordToggle } from '@/src/components/auth/password-toggle';
import { Button } from '@/src/components/ui/button';
import { colors } from '@/src/theme';
import { authStyles } from '@/src/styles/auth';

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const handleInputChange = useCallback((field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);
  
  const handleLogin = useCallback(async () => {
    if (!formData.email || !formData.password) {
      console.log('Please fill all fields');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login successful');
      router.replace('/(tabs)');
    }, 1000);
  }, [formData.email, formData.password, router]);
  
  const handleSocialLogin = useCallback((provider: string) => {
    console.log(`Social login with ${provider}`);
    // In real app, this would trigger OAuth flow
  }, []);
  
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);
  
  return (
    <KeyboardAvoidingView 
      style={authStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={authStyles.scrollContent}>
        <View style={authStyles.header}>
          <Text style={authStyles.title}>Welcome Back</Text>
          <Text style={authStyles.subtitle}>Sign in to your account</Text>
        </View>
        
        <View style={authStyles.formContainer}>
          <AuthInput
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(value: string) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <AuthInput
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(value: string) => handleInputChange('password', value)}
            secureTextEntry={!showPassword}
            rightIcon={(
              <PasswordToggle
                visible={showPassword}
                onToggle={togglePasswordVisibility}
              />
            )}
          />
          
          <View style={authStyles.forgotPasswordContainer}>
            <Link href="/forgot-password" style={authStyles.forgotPasswordLink}>
              Forgot Password?
            </Link>
          </View>
          
          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={isLoading}
            style={authStyles.submitButton}
          />
          
          <View style={authStyles.dividerContainer}>
            <View style={authStyles.dividerLine} />
            <Text style={authStyles.dividerText}>or continue with</Text>
            <View style={authStyles.dividerLine} />
          </View>
          
          <View style={authStyles.socialButtonsContainer}>
            <SocialButton
              provider="google"
              onPress={() => handleSocialLogin('google')}
            />
            <SocialButton
              provider="facebook"
              onPress={() => handleSocialLogin('facebook')}
            />
            <SocialButton
              provider="apple"
              onPress={() => handleSocialLogin('apple')}
            />
          </View>
          
          <View style={authStyles.footerContainer}>
            <Text style={authStyles.footerText}>Don't have an account? </Text>
            <Link href="/register" style={authStyles.footerLink}>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
