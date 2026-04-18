import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@/src/components/ui';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = (): void => {
    router.replace('/(tabs)');
  };

  const handleRegister = (): void => {
    router.push('/(auth)/register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Button title="Login" onPress={handleLogin} style={styles.button} />
      <Button title="Register" onPress={handleRegister} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    marginVertical: 10,
    width: '100%',
  },
});