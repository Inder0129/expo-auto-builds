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
import { SocialButtons } from '@/src/components/auth/social-buttons';
import { styles } from '@/src/styles/auth';

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = useCallback((field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleLogin = useCallback(async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    router.replace('/(tabs)');
  }, [router]);

  const handleSocialLogin = useCallback((provider: string) => {
    console.log(`Logging in with ${provider}`);
  }, []);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeInDown.duration(800)}>
          <AuthHeader 
            title="Welcome Back" 
            subtitle="Sign in to continue" 
          />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200).duration(800)}>
          <AnimatedForm>
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

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={styles.loginButtonText}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </AnimatedForm>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400).duration(800)}>
          <SocialButtons onSocialLogin={handleSocialLogin} />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(600).duration(800)} style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Link href="/register" asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
