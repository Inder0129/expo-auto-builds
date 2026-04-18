import React, { useState, useCallback } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthInput } from '@/src/components/auth/auth-input';
import { OtpInput } from '@/src/components/auth/otp-input';
import { Button } from '@/src/components/ui/button';
import { colors } from '@/src/theme';
import authStyles from '@/src/styles/auth';

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterScreen() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [otp, setOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);

  const handleInputChange = useCallback((field: keyof RegisterData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const validateStep1 = useCallback((): boolean => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return false;
    }
    if (!formData.password) {
      Alert.alert('Error', 'Please enter a password');
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    return true;
  }, [formData]);

  const handleSendOtp = useCallback(() => {
    if (!validateStep1()) return;
    
    setIsLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setIsLoading(false);
      setIsOtpSent(true);
      setStep(2);
      Alert.alert('OTP Sent', 'Please check your phone for the OTP');
    }, 1000);
  }, [validateStep1]);

  const handleVerifyOtp = useCallback(() => {
    if (!otp || otp.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Account created successfully!');
      router.replace('/(tabs)');
    }, 1500);
  }, [otp, router]);

  const handleResendOtp = useCallback(() => {
    setIsLoading(true);
    // Simulate OTP resend
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('OTP Resent', 'New OTP has been sent to your phone');
    }, 1000);
  }, []);

  const handleLogin = useCallback(() => {
    router.push('/login');
  }, [router]);

  return (
    <SafeAreaView style={authStyles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={authStyles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={authStyles.scrollContent}>
          <View style={authStyles.header}>
            <Text style={authStyles.title}>Create Account</Text>
            <Text style={authStyles.subtitle}>Join us today!</Text>
          </View>

          {step === 1 ? (
            <View style={authStyles.form}>
              <AuthInput
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChangeText={(value: string) => handleInputChange('name', value)}
                autoComplete="name"
              />
              
              <AuthInput
                label="Email Address"
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(value: string) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoComplete="email"
              />
              
              <AuthInput
                label="Phone Number"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChangeText={(value: string) => handleInputChange('phone', value)}
                keyboardType="phone-pad"
                autoComplete="tel"
              />
              
              <AuthInput
                label="Password"
                placeholder="Create a password"
                value={formData.password}
                onChangeText={(value: string) => handleInputChange('password', value)}
                secureTextEntry={true}
                autoComplete="password-new"
              />
              
              <AuthInput
                label="Confirm Password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChangeText={(value: string) => handleInputChange('confirmPassword', value)}
                secureTextEntry={true}
                autoComplete="password-new"
              />

              <Button
                title="Send OTP"
                onPress={handleSendOtp}
                variant="primary"
                style={authStyles.registerButton}
                loading={isLoading}
                disabled={isLoading}
              />

              <View style={authStyles.footer}>
                <Text style={authStyles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={handleLogin}>
                  <Text style={authStyles.loginText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={authStyles.form}>
              <View style={authStyles.otpHeader}>
                <Text style={authStyles.otpTitle}>Verify Phone Number</Text>
                <Text style={authStyles.otpSubtitle}>
                  Enter the 6-digit OTP sent to {formData.phone}
                </Text>
              </View>

              <OtpInput
                otp={otp}
                setOtp={setOtp}
                length={6}
              />

              <TouchableOpacity onPress={handleResendOtp} style={authStyles.resendContainer}>
                <Text style={authStyles.resendText}>
                  Didn't receive OTP? <Text style={authStyles.resendLink}>Resend</Text>
                </Text>
              </TouchableOpacity>

              <Button
                title="Verify & Create Account"
                onPress={handleVerifyOtp}
                variant="primary"
                style={authStyles.verifyButton}
                loading={isLoading}
                disabled={isLoading || otp.length !== 6}
              />

              <TouchableOpacity onPress={() => setStep(1)} style={authStyles.backButton}>
                <Text style={authStyles.backText}>← Back to Registration</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
