import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Button } from '@/src/components/ui';
import { colors, spacing, typography } from '@/src/theme';
import { useAppDispatch } from '@/src/store/hooks';
import { login } from '@/src/store/slices/auth';
import { useState } from 'react';

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (): void => {
    if (email && password) {
      dispatch(login({ email, name: 'User' }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Animated.View entering={FadeIn.delay(200)} style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
      </Animated.View>

      <Animated.View entering={SlideInUp.delay(400)} style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor={colors.gray}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor={colors.gray}
            secureTextEntry
          />
        </View>

        <Button
          title="Sign In"
          onPress={handleLogin}
          style={styles.button}
          size="large"
        />

        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text style={styles.link}>Register</Text>
        </Text>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: spacing.lg
  },
  header: {
    marginBottom: spacing.xl
  },
  title: {
    ...typography.h1,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs
  },
  subtitle: {
    ...typography.body,
    color: colors.gray,
    textAlign: 'center'
  },
  form: {
    width: '100%'
  },
  inputContainer: {
    marginBottom: spacing.md
  },
  label: {
    ...typography.body,
    color: colors.text,
    marginBottom: spacing.xs
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface
  },
  button: {
    marginTop: spacing.lg
  },
  footerText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.lg
  },
  link: {
    color: colors.primary,
    fontWeight: '600'
  }
});