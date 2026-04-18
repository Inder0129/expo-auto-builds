import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { AuthHeader } from '@/src/components/auth/auth-header';
import { AnimatedForm } from '@/src/components/auth/animated-form';
import { PasswordStrength } from '@/src/components/auth/password-strength';
import { TermsCheckbox } from '@/src/components/auth/terms-checkbox';
import { styles } from '@/src/styles/auth';

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
    confirmPassword: '' 
  });
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = useCallback((field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleRegister = useCallback(async () => {
    if (!acceptedTerms) {
      alert('Please accept the terms and conditions');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    router.replace('/(tabs)');
  }, [formData, acceptedTerms, router]);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInDown.duration(800)}>
          <AuthHeader 
            title="Create Account" 
            subtitle="Join our community" 
          />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200).duration(800)}>
          <AnimatedForm>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={24} color={colors.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor={colors.textSecondary}
                value={formData.name}
                onChangeText={(value: string) => handleInputChange('name', value)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={24} color={colors.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={colors.textSecondary}
                value={formData.email}
                onChangeText={(value: string) => handleInputChange('email', value)}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={24} color={colors.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={colors.textSecondary}
                value={formData.password}
                onChangeText={(value: string) => handleInputChange('password', value)}
                secureTextEntry
              />
            </View>

            <PasswordStrength password={formData.password} />

            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={24} color={colors.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor={colors.textSecondary}
                value={formData.confirmPassword}
                onChangeText={(value: string) => handleInputChange('confirmPassword', value)}
                secureTextEntry
              />
            </View>

            <TermsCheckbox 
              value={acceptedTerms}
              onValueChange={setAcceptedTerms}
            />

            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>
          </AnimatedForm>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400).duration(800)} style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Sign In</Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
