import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { AuthForm } from '@/src/components/auth/auth-form';
import { SocialLogin } from '@/src/components/auth/social-login';
import { Button } from '@/src/components/ui/button';
import { WrapperView } from '@/src/components/ui/wrapper-view';
import { useAppDispatch } from '@/src/store/hooks';
import { login } from '@/src/store/slices/auth';
import { colors, spacing, typography } from '@/src/theme';
import { styles } from '@/src/styles/auth';

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(async (data: LoginFormData) => {
    setLoading(true);
    try {
      await dispatch(login(data)).unwrap();
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  }, [dispatch, router]);

  const handleSocialLogin = useCallback((provider: string) => {
    Alert.alert('Social Login', `Login with ${provider}`);
  }, []);

  return (
    <WrapperView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Allen Study</Text>
        <Text style={styles.subtitle}>Login to continue</Text>
        
        <AuthForm
          type="login"
          onSubmit={handleLogin}
          loading={loading}
        />
        
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.divider} />
        </View>
        
        <SocialLogin onSocialLogin={handleSocialLogin} />
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Link href="/register" style={styles.link}>Register</Link>
        </View>
      </ScrollView>
    </WrapperView>
  );
}
