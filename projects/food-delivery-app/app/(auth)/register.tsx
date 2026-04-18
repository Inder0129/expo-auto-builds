import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '@/src/theme';
import { Button, Input } from '@/src/components/ui';

export default function RegisterScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Input placeholder="Full Name" style={styles.input} />
        <Input placeholder="Email" style={styles.input} />
        <Input placeholder="Password" secureTextEntry style={styles.input} />
        <Input placeholder="Confirm Password" secureTextEntry style={styles.input} />
        <Button title="Sign Up" style={styles.button} />
        <Text style={styles.footerText}>Already have an account? Sign in</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    ...typography.h1,
    color: colors.text,
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  footerText: {
    ...typography.body,
    color: colors.gray,
    textAlign: 'center',
    marginTop: 24,
  },
});