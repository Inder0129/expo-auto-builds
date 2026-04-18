import React, { useState, useCallback } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Stack, useRouter, Link } from 'expo-router';
import { AuthForm } from '@/src/components/auth/auth-form';
import { TermsCheckbox } from '@/src/components/auth/terms-checkbox';
import { VerifyPhone } from '@/src/components/auth/verify-phone';
import { Button } from '@/src/components/ui/button';
import { useAppDispatch } from '@/src/store/hooks';
import { register } from '@/src/store/slices/auth';
import { colors } from '@/src/theme/colors';
import { typography } from '@/src/theme/typography';
import { spacing } from '@/src/theme/spacing';
import { authStyles } from '@/src/styles/auth';

interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [verificationStep, setVerificationStep] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleRegister = useCallback(async (data: RegisterFormData) => {
    if (!acceptedTerms) {
      Alert.alert('Terms Required', 'Please accept the terms and conditions');
      return;
    }
    
    if (data.password !== data.confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }

    setPhoneNumber(data.phone);
    setVerificationStep(true);
  }, [acceptedTerms]);

  const handleVerifyPhone = useCallback(async (otp: string) => {
    setLoading(true);
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (otp === '123456') {
        dispatch(register({ 
          email: 'user@example.com', 
          name: 'New User', 
          token: 'fake-jwt-token' 
        }));
        
        router.replace('/(tabs)');
      } else {
        Alert.alert('Verification Failed', 'Invalid OTP code');
      }
    } catch (error: any) {
      Alert.alert('Error', 'Verification failed');
    } finally {
      setLoading(false);
    }
  }, [dispatch, router]);

  const handleResendOtp = useCallback(() => {
    Alert.alert('OTP Resent', 'New OTP has been sent to your phone');
  }, []);

  const handleToggleTerms = useCallback(() => {
    setAcceptedTerms((prev: boolean) => !prev);
  }, []);

  const handleLogin = useCallback(() => {
    router.push('/login');
  }, [router]);

  if (verificationStep) {
    return (
      <View style={authStyles.container}>
        <Stack.Screen options={{ title: 'Verify Phone', headerShown: false }} />
        
        <VerifyPhone
          phoneNumber={phoneNumber}
          onVerify={handleVerifyPhone}
          onResend={handleResendOtp}
          loading={loading}
        />
      </View>
    );
  }

  return (
    <View style={authStyles.container}>
      <Stack.Screen options={{ title: 'Register', headerShown: false }} />
      
      <View style={authStyles.header}>
        <Text style={authStyles.title}>Create Account</Text>
        <Text style={authStyles.subtitle}>Sign up to get started</Text>
      </View>
      
      <AuthForm
        type="register"
        onSubmit={handleRegister}
        loading={loading}
      />
      
      <TermsCheckbox
        checked={acceptedTerms}
        onToggle={handleToggleTerms}
      />
      
      <View style={authStyles.footer}>
        <Text style={authStyles.footerText}>Already have an account? </Text>
        <Link href="/login" style={authStyles.footerLink}>
          <Text style={authStyles.footerLinkText}>Sign In</Text>
        </Link>
      </View>
    </View>
  );
}
