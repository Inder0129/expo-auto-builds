import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '@/src/theme';
import { Button, Input } from '@/src/components/ui';

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
        <Input placeholder="Email" style={styles.input} />
        <Input placeholder="Password" secureTextEntry style={styles.input} />
        <Button title="Sign In" style={styles.button} />
        <Text style={styles.footerText}>Don't have an account? Sign up</Text>
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