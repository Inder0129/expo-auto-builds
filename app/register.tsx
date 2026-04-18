import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/src/styles/auth';
import { colors } from '@/src/theme';

type RegisterFormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type ValidationErrors = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
};

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');

  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/[\s\-()]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleRegister = useCallback(async () => {
    if (!validateForm()) {
      return;
    }

    if (!acceptedTerms) {
      Alert.alert('Error', 'Please accept the terms and conditions');
      return;
    }

    setLoading(true);
    // Simulate API call for registration
    setTimeout(() => {
      setLoading(false);
      setShowOtp(true);
    }, 1500);
  }, [validateForm, acceptedTerms]);

  const handleVerifyOtp = useCallback(() => {
    if (!otp.trim() || otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    // Simulate OTP verification
    setTimeout(() => {
      Alert.alert('Success', 'Account created successfully!');
      router.replace('/(tabs)');
    }, 1000);
  }, [otp, router]);

  const handleResendOtp = useCallback(() => {
    Alert.alert('OTP Resent', 'A new OTP has been sent to your phone');
  }, []);

  if (showOtp) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowOtp(false)} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Verify OTP</Text>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.otpContainer}>
          <Ionicons name="phone-portrait-outline" size={64} color={colors.primary} />
          <Text style={styles.otpTitle}>Verify Your Phone</Text>
          <Text style={styles.otpSubtitle}>
            We've sent a 6-digit verification code to {formData.phone}
          </Text>

          <TextInput
            style={styles.otpInput}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={(text: string) => setOtp(text.replace(/[^0-9]/g, '').slice(0, 6))}
            placeholderTextColor={colors.gray}
            keyboardType="numeric"
            maxLength={6}
          />

          <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
            <Text style={styles.verifyButtonText}>Verify & Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleResendOtp} style={styles.resendButton}>
            <Text style={styles.resendText}>Didn't receive code? </Text>
            <Text style={styles.resendLink}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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
            <Text style={styles.headerTitle}>Sign Up</Text>
            <View style={styles.headerRight} />
          </View>

          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Ionicons name="restaurant" size={64} color={colors.primary} />
              <Text style={styles.logoText}>FoodDelivery</Text>
              <Text style={styles.tagline}>Join our foodie community</Text>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Create Account</Text>
              <Text style={styles.formSubtitle}>Fill in your details to get started</Text>

              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color={colors.gray} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, errors.name && styles.inputError]}
                  placeholder="Full Name"
                  value={formData.name}
                  onChangeText={(text: string) => {
                    setFormData((prev) => ({ ...prev, name: text }));
                    setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  placeholderTextColor={colors.gray}
                />
              </View>
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color={colors.gray} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="Email Address"
                  value={formData.email}
                  onChangeText={(text: string) => {
                    setFormData((prev) => ({ ...prev, email: text }));
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                  placeholderTextColor={colors.gray}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={20} color={colors.gray} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, errors.phone && styles.inputError]}
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChangeText={(text: string) => {
                    setFormData((prev) => ({ ...prev, phone: text }));
                    setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  placeholderTextColor={colors.gray}
                  keyboardType="phone-pad"
                />
              </View>
              {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.gray} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, errors.password && styles.inputError]}
                  placeholder="Password"
                  value={formData.password}
                  onChangeText={(text: string) => {
                    setFormData((prev) => ({ ...prev, password: text }));
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
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
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={colors.gray} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, errors.confirmPassword && styles.inputError]}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChangeText={(text: string) => {
                    setFormData((prev) => ({ ...prev, confirmPassword: text }));
                    setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                  }}
                  placeholderTextColor={colors.gray}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.passwordToggle}
                >
                  <Ionicons
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={colors.gray}
                  />
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

              <TouchableOpacity
                style={styles.termsContainer}
                onPress={() => setAcceptedTerms(!acceptedTerms)}
              >
                <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
                  {acceptedTerms && <Ionicons name="checkmark" size={16} color={colors.white} />}
                </View>
                <Text style={styles.termsText}>
                  I agree to the{' '}
                  <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.registerButton, loading && styles.registerButtonDisabled]}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <Text style={styles.registerButtonText}>Creating Account...</Text>
                ) : (
                  <Text style={styles.registerButtonText}>Sign Up</Text>
                )}
              </TouchableOpacity>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <Link href="/login" asChild>
                  <TouchableOpacity>
                    <Text style={styles.loginLink}>Login</Text>
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
