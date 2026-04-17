import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/src/store/hooks';
import { setUser } from '@/src/store/slices/auth';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import { RegistrationForm } from '@/src/components/auth/registration-form';
import { TermsCheckbox } from '@/src/components/auth/terms-checkbox';
import { styles } from '@/src/styles/auth';

export default function RegisterScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  
  const handleTermsChange = useCallback((value: boolean) => {
    setAcceptedTerms(value);
  }, []);
  
  const handleRegisterSubmit = useCallback((data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    if (!acceptedTerms) {
      return;
    }
    
    dispatch(setUser({ 
      name: data.name, 
      email: data.email, 
      phone: data.phone 
    }));
    router.replace('/(tabs)');
  }, [acceptedTerms, dispatch, router]);
  
  const handleLoginPress = useCallback(() => {
    router.push('/login');
  }, [router]);
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>
        
        <RegistrationForm onSubmit={handleRegisterSubmit} />
        
        <TermsCheckbox
          value={acceptedTerms}
          onChange={handleTermsChange}
        />
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Button
            title="Login"
            variant="text"
            onPress={handleLoginPress}
            style={styles.registerButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
