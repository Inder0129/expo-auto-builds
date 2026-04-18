import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import { Button } from '@/src/components/ui';
import { colors, spacing, typography } from '@/src/theme';
import { useAppDispatch } from '@/src/store/hooks';
import { login } from '@/src/store/slices/auth';
import { useState } from 'react';

export default function RegisterScreen() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = (): void => {
    if (name && email && password) {
      dispatch(login({ email, name }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Animated.View entering={FadeIn.delay(200)} style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join our animated community</Text>
      </Animated.View>

      <Animated.View entering={SlideInRight.delay(400)} style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            placeholderTextColor={colors.gray}
          />
        </View>

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
            placeholder="Create a password"
            placeholderTextColor={colors.gray}
            secureTextEntry
          />
        </View>

        <Button
          title="Create Account"
          onPress={handleRegister}
          style={styles.button}
          size="large"
        />

        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text style={styles.link}>Sign In</Text>
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