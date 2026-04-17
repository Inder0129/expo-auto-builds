import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/src/store/hooks';
import { setUser } from '@/src/store/slices/auth';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import { AuthForm } from '@/src/components/auth/auth-form';
import { SocialLogin } from '@/src/components/auth/social-login';
import { OTPInput } from '@/src/components/auth/otp-input';
import { styles } from '@/src/styles/auth';

type LoginMethod = 'phone' | 'email';

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('phone');
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  
  const handleMethodChange = useCallback((method: LoginMethod) => {
    setLoginMethod(method);
  }, []);
  
  const handleLoginSubmit = useCallback((data: { phone?: string; email?: string; password?: string }) => {
    if (loginMethod === 'phone' && data.phone) {
      setPhoneNumber(data.phone);
      setShowOTP(true);
    } else if (loginMethod === 'email' && data.email && data.password) {
      dispatch(setUser({ email: data.email, name: 'User' }));
      router.replace('/(tabs)');
    }
  }, [loginMethod, dispatch, router]);
  
  const handleOTPComplete = useCallback((otp: string) => {
    dispatch(setUser({ phone: phoneNumber, name: 'User' }));
    router.replace('/(tabs)');
  }, [phoneNumber, dispatch, router]);
  
  const handleSocialLogin = useCallback((provider: string) => {
    dispatch(setUser({ email: 'user@example.com', name: 'User' }));
    router.replace('/(tabs)');
  }, [dispatch, router]);
  
  const handleRegisterPress = useCallback(() => {
    router.push('/register');
  }, [router]);
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>
        
        {showOTP ? (
          <View style={styles.otpContainer}>
            <OTPInput onComplete={handleOTPComplete} />
          </View>
        ) : (
          <>
            <AuthForm
              method={loginMethod}
              onSubmit={handleLoginSubmit}
              onMethodChange={handleMethodChange}
            />
            
            <View style={styles.socialContainer}>
              <Text style={styles.socialTitle}>Or continue with</Text>
              <SocialLogin onLogin={handleSocialLogin} />
            </View>
          </>
        )}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Button
            title="Register"
            variant="text"
            onPress={handleRegisterPress}
            style={styles.registerButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
