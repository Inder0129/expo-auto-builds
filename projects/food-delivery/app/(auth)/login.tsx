import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui';
import { Input } from '@/src/components/ui';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = (): void => {
    console.log('Login');
    router.push('/(tabs)');
  };

  const handleRegister = (): void => {
    router.push('/register');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>
      <View style={styles.form}>
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
        <Button
          title="Sign In"
          onPress={handleLogin}
          style={styles.loginButton}
        />
        <View style={styles.registerSection}>
          <Text style={styles.registerText}>Don't have an account?</Text>
          <Button
            title="Sign Up"
            onPress={handleRegister}
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
  loginButton: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  registerSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: typography.fontSize.md,
    color: colors.gray,
    marginRight: spacing.xs,
  },
});