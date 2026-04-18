import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthInput } from '@/src/components/auth/auth-input';
import { SocialLoginButton } from '@/src/components/auth/social-login-button';
import { Button } from '@/src/components/ui/button';
import { colors } from '@/src/theme';
import authStyles from '@/src/styles/auth';

type LoginMethod = 'phone' | 'email';

export default function LoginScreen() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('phone');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoginMethodChange = useCallback((method: LoginMethod) => {
    setLoginMethod(method);
    setPhone('');
    setEmail('');
    setPassword('');
  }, []);

  const handleLogin = useCallback(async () => {
    if (loginMethod === 'phone' && !phone) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    if (loginMethod === 'email' && !email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Logged in successfully!');
      router.replace('/(tabs)');
    }, 1500);
  }, [loginMethod, phone, email, password, router]);

  const handleSocialLogin = useCallback((provider: string) => {
    Alert.alert('Social Login', `Login with ${provider} would be implemented here`);
  }, []);

  const handleForgotPassword = useCallback(() => {
    Alert.alert('Forgot Password', 'Password reset flow would start here');
  }, []);

  const handleRegister = useCallback(() => {
    router.push('/register');
  }, [router]);

  return (
    <SafeAreaView style={authStyles.container} edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={authStyles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={authStyles.scrollContent}>
          <View style={authStyles.header}>
            <Text style={authStyles.title}>Welcome Back</Text>
            <Text style={authStyles.subtitle}>Sign in to continue</Text>
          </View>

          <View style={authStyles.methodSelector}>
            <TouchableOpacity
              style={[
                authStyles.methodButton,
                loginMethod === 'phone' && authStyles.methodButtonActive
              ]}
              onPress={() => handleLoginMethodChange('phone')}
            >
              <Text style={[
                authStyles.methodButtonText,
                loginMethod === 'phone' && authStyles.methodButtonTextActive
              ]}>
                Phone
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                authStyles.methodButton,
                loginMethod === 'email' && authStyles.methodButtonActive
              ]}
              onPress={() => handleLoginMethodChange('email')}
            >
              <Text style={[
                authStyles.methodButtonText,
                loginMethod === 'email' && authStyles.methodButtonTextActive
              ]}>
                Email
              </Text>
            </TouchableOpacity>
          </View>

          <View style={authStyles.form}>
            {loginMethod === 'phone' ? (
              <AuthInput
                label="Phone Number"
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                autoComplete="tel"
              />
            ) : (
              <AuthInput
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoComplete="email"
              />
            )}
            
            <AuthInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              autoComplete="password"
            />

            <TouchableOpacity onPress={handleForgotPassword} style={authStyles.forgotPassword}>
              <Text style={authStyles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              title="Sign In"
              onPress={handleLogin}
              variant="primary"
              style={authStyles.loginButton}
              loading={isLoading}
              disabled={isLoading}
            />

            <View style={authStyles.dividerContainer}>
              <View style={authStyles.divider} />
              <Text style={authStyles.dividerText}>or continue with</Text>
              <View style={authStyles.divider} />
            </View>

            <View style={authStyles.socialButtons}>
              <SocialLoginButton
                provider="google"
                onPress={() => handleSocialLogin('Google')}
              />
              <SocialLoginButton
                provider="facebook"
                onPress={() => handleSocialLogin('Facebook')}
              />
              <SocialLoginButton
                provider="apple"
                onPress={() => handleSocialLogin('Apple')}
              />
            </View>

            <View style={authStyles.footer}>
              <Text style={authStyles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={handleRegister}>
                <Text style={authStyles.registerText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
