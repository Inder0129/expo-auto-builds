import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { AuthInput } from '@/src/components/auth/auth-input';
import { PasswordStrength } from '@/src/components/auth/password-strength';
import { TermsCheckbox } from '@/src/components/auth/terms-checkbox';
import { Button } from '@/src/components/ui/button';
import { colors } from '@/src/theme';
import { authStyles } from '@/src/styles/auth';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const handleInputChange = useCallback((field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);
  
  const handleRegister = useCallback(async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      console.log('Please fill all fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    
    if (!acceptedTerms) {
      console.log('Please accept terms and conditions');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log('Registration successful');
      router.replace('/(tabs)');
    }, 1000);
  }, [formData, acceptedTerms, router]);
  
  const toggleTerms = useCallback(() => {
    setAcceptedTerms(prev => !prev);
  }, []);
  
  return (
    <KeyboardAvoidingView 
      style={authStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={authStyles.scrollContent}>
        <View style={authStyles.header}>
          <Text style={authStyles.title}>Create Account</Text>
          <Text style={authStyles.subtitle}>Join ShopEasy today</Text>
        </View>
        
        <View style={authStyles.formContainer}>
          <AuthInput
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChangeText={(value: string) => handleInputChange('name', value)}
          />
          
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
            placeholder="Create a password"
            value={formData.password}
            onChangeText={(value: string) => handleInputChange('password', value)}
            secureTextEntry
          />
          
          <PasswordStrength password={formData.password} />
          
          <AuthInput
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChangeText={(value: string) => handleInputChange('confirmPassword', value)}
            secureTextEntry
          />
          
          <TermsCheckbox
            checked={acceptedTerms}
            onToggle={toggleTerms}
          />
          
          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={isLoading}
            style={authStyles.submitButton}
          />
          
          <View style={authStyles.footerContainer}>
            <Text style={authStyles.footerText}>Already have an account? </Text>
            <Link href="/login" style={authStyles.footerLink}>
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
