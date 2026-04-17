import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { login } from '@/src/store/slices/auth';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { LoadingIndicator } from '@/src/components/ui/LoadingIndicator';
import { colors, spacing, typography } from '@/src/theme';
import { LoginForm } from '@/src/components/auth/LoginForm';
import { SocialLogin } from '@/src/components/auth/SocialLogin';
import { SignupLink } from '@/src/components/auth/SignupLink';
import { styles } from '@/src/styles/auth';

type LoginCredentials = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState<LoginCredentials>({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleLogin = useCallback(async () => {
    if (!credentials.email || !credentials.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch(login({ 
        user: { 
          id: '1', 
          email: credentials.email, 
          name: 'User' 
        }, 
        token: 'fake-jwt-token' 
      }));
      
      router.replace('/(tabs)');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [credentials, dispatch, router]);

  const handleSocialLogin = useCallback((provider: string) => {
    console.log(`Social login with ${provider}`);
    // Implement social login logic
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <LoginForm 
          credentials={credentials}
          onChange={setCredentials}
          onSubmit={handleLogin}
          error={error}
        />

        <SocialLogin onSocialLogin={handleSocialLogin} />

        <SignupLink />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
