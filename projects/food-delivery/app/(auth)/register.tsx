import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui';
import { Input } from '@/src/components/ui';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();

  const handleRegister = (): void => {
    console.log('Register');
    router.push('/(tabs)');
  };

  const handleLogin = (): void => {
    router.push('/login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
      </View>
      <View style={styles.form}>
        <Input
          placeholder="Full Name"
          style={styles.input}
        />
        <Input
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          placeholder="Password"
          style={styles.input}
          secureTextEntry
        />
        <Input
          placeholder="Confirm Password"
          style={styles.input}
          secureTextEntry
        />
        <Button
          title="Sign Up"
          onPress={handleRegister}
          style={styles.registerButton}
        />
        <View style={styles.loginSection}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <Button
            title="Sign In"
            onPress={handleLogin}
            variant="text"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.gray,
  },
  form: {
    paddingHorizontal: spacing.md,
  },
  input: {
    marginBottom: spacing.md,
  },
  registerButton: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: typography.fontSize.md,
    color: colors.gray,
    marginRight: spacing.xs,
  },
});