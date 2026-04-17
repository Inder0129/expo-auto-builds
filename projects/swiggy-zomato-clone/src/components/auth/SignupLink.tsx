import React from 'react';
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { styles } from '@/src/styles/auth';

export function SignupLink() {
  return (
    <View style={styles.signupContainer}>
      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Link href="/register" style={styles.signupLink}>
          Sign up
        </Link>
      </Text>
    </View>
  );
}
