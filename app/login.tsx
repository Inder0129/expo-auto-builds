import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/src/styles/auth';
import { colors } from '@/src/theme';

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = useCallback(async () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Success', 'Logged in successfully');
      router.replace('/(tabs)');
    }, 1500);
  }, [formData, router]);

  const handleSocialLogin = useCallback((provider: string) => {
    Alert.alert('Social Login', `Login with ${provider} would be implemented here`);
  }, []);

  const handleForgotPassword = useCallback(() => {
    router.push('/forgot-password');
  }, [router]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Login</Text>
            <View style={styles.headerRight} />
          </View>

          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Ionicons name="restaurant" size={64} color={colors.primary} />
              <Text style={styles.logoText}>FoodDelivery</Text>
              <Text style={styles.tagline}>Delicious food at your doorstep</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Welcome Back</Text>
              <Text style={styles.formSubtitle}>Please sign in to continue</Text>

              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color={colors.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  value={formData.email}
                  onChangeText={(text: string) => setFormData((prev) => ({ ...prev, email: text }))}
                  placeholderTextColor={colors.gray}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.gray} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={formData.password}
                  onChangeText={(text: string) => setFormData((prev) => ({ ...prev, password: text }))}
                  placeholderTextColor={colors.gray}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.passwordToggle}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={colors.gray}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <Text style={styles.loginButtonText}>Logging in...</Text>
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>or continue with</Text>
                <View style={styles.divider} />
              </View>

              <View style={styles.socialButtonsContainer}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Google')}
                >
                  <Ionicons name="logo-google" size={24} color={colors.error} />
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Facebook')}
                >
                  <Ionicons name="logo-facebook" size={24} color={colors.facebook} />
                  <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Don't have an account? </Text>
                <Link href="/register" asChild>
                  <TouchableOpacity>
                    <Text style={styles.registerLink}>Sign Up</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
