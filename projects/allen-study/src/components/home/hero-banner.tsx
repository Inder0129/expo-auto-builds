import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

type HeroBannerProps = {
  userName: string;
};

export function HeroBanner({ userName }: HeroBannerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome back,</Text>
      <Text style={styles.userName}>{userName}!</Text>
      <Text style={styles.subtitle}>Ready to ace your exams?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  greeting: {
    ...typography.body,
    color: colors.white,
    opacity: 0.9,
  },
  userName: {
    ...typography.h1,
    color: colors.white,
    marginVertical: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.white,
    opacity: 0.8,
  },
});
