import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';

export const LoginLink: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Already have an account? </Text>
      <Link href="/(auth)/login" style={styles.link}>
        Login
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
  },
  link: {
    fontSize: typography.fontSize.md,
    color: colors.primary,
    fontWeight: typography.fontWeight.semiBold,
  },
});
