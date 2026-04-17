import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { AuthForm } from '@/src/components/auth/auth-form';
import { TermsAgreement } from '@/src/components/auth/terms-agreement';
import { Button } from '@/src/components/ui/button';
import { WrapperView } from '@/src/components/ui/wrapper-view';
import { useAppDispatch } from '@/src/store/hooks';
import { register } from '@/src/store/slices/auth';
import { colors, spacing, typography } from '@/src/theme';
import { styles } from '@/src/styles/auth';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleRegister = useCallback(async (data: RegisterFormData) => {
    if (!acceptedTerms) {
      Alert.alert('Terms Required', 'Please accept the terms and conditions');
      return;
    }
    
    if (data.password !== data.confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await dispatch(register(data)).unwrap();
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Registration Failed', 'Please try again');
    } finally {
      setLoading(false);
    }
  }, [dispatch, router, acceptedTerms]);

  return (
    <WrapperView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Allen Study</Text>
        <Text style={styles.subtitle}>Create your account</Text>
        
        <AuthForm
          type="register"
          onSubmit={handleRegister}
          loading={loading}
        />
        
        <TermsAgreement
          accepted={acceptedTerms}
          onToggle={() => setAcceptedTerms(!acceptedTerms)}
        />
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/login" style={styles.link}>Login</Link>
        </View>
      </ScrollView>
    </WrapperView>
  );
}
