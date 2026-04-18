import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/src/theme';
import { Button } from '@/src/components/ui';
import { RegisterForm } from '@/src/components/register/register-form';
import { TermsCheckbox } from '@/src/components/register/terms-checkbox';
import { LoginLink } from '@/src/components/register/login-link';
import { styles } from '@/src/styles/auth';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleRegister = useCallback(() => {
    if (!acceptedTerms) {
      alert('Please accept the terms and conditions');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    router.replace('/(tabs)');
  }, [formData, acceptedTerms, router]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Create Account</Text>
        <RegisterForm
          formData={formData}
          onInputChange={handleInputChange}
        />
        <TermsCheckbox
          accepted={acceptedTerms}
          onToggle={() => setAcceptedTerms(!acceptedTerms)}
        />
        <Button
          title="Register"
          onPress={handleRegister}
          style={styles.registerButton}
          disabled={!formData.name || !formData.email || !formData.password || !formData.confirmPassword}
        />
        <LoginLink />
      </ScrollView>
    </SafeAreaView>
  );
}
