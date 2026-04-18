import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { colors } from '@/src/theme';
import { AuthInput } from '@/src/components/auth/auth-input';
import { OtpInput } from '@/src/components/auth/otp-input';
import { SocialLoginButton } from '@/src/components/auth/social-login-button';
import { AuthFooter } from '@/src/components/auth/auth-footer';
import { styles } from '@/src/styles/auth';

type LoginMethod = 'phone' | 'email';

export default function LoginScreen() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('phone');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [showOtp, setShowOtp] = useState<boolean>(false);

  const handleLogin = useCallback(() => {
    if (loginMethod === 'phone') {
      if (phone.length < 10) {
        alert('Please enter a valid phone number');
        return;
      }
      setShowOtp(true);
    } else {
      if (!email || !password) {
        alert('Please enter email and password');
        return;
      }
      router.replace('/(tabs)');
    }
  }, [loginMethod, phone, email, password, router]);

  const handleOtpComplete = useCallback((code: string) => {
    setOtp(code);
    if (code.length === 6) {
      router.replace('/(tabs)');
    }
  }, [router]);

  const handleSocialLogin = useCallback((provider: string) => {
    console.log(`Logging in with ${provider}`);
    router.replace('/(tabs)');
  }, [router]);

  const handleForgotPassword = useCallback(() => {
    router.push('/forgot-password');
  }, [router]);

  const handleRegister = useCallback(() => {
    router.push('/register');
  }, [router]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Stack.Screen options={{ title: 'Login' }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.methodToggle}>
          <TouchableOpacity
            style={[styles.toggleButton, loginMethod === 'phone' && styles.toggleButtonActive]}
            onPress={() => setLoginMethod('phone')}
          >
            <Text style={[styles.toggleText, loginMethod === 'phone' && styles.toggleTextActive]}>
              Phone
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, loginMethod === 'email' && styles.toggleButtonActive]}
            onPress={() => setLoginMethod('email')}
          >
            <Text style={[styles.toggleText, loginMethod === 'email' && styles.toggleTextActive]}>
              Email
            </Text>
          </TouchableOpacity>
        </View>

        {showOtp ? (
          <OtpInput onComplete={handleOtpComplete} />
        ) : (
          <View style={styles.form}>
            {loginMethod === 'phone' ? (
              <AuthInput
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                icon="call-outline"
              />
            ) : (
              <>
                <AuthInput
                  placeholder="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  icon="mail-outline"
                />
                <AuthInput
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  icon="lock-closed-outline"
                />
                <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>
                {loginMethod === 'phone' ? 'Send OTP' : 'Login'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialButtons}>
          <SocialLoginButton
            provider="google"
            onPress={() => handleSocialLogin('google')}
          />
          <SocialLoginButton
            provider="facebook"
            onPress={() => handleSocialLogin('facebook')}
          />
          <SocialLoginButton
            provider="apple"
            onPress={() => handleSocialLogin('apple')}
          />
        </View>

        <AuthFooter
          text="Don't have an account?"
          linkText="Sign Up"
          onPress={handleRegister}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
