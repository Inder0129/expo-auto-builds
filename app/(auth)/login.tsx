import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from '../../src/components/ui';
import { useAppDispatch } from '../../src/store/hooks';
import { login } from '../../src/store/slices/auth';

export default function LoginScreen() {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(login({ email: 'test@example.com', password: 'password' }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Input placeholder="Email" />
      <Input placeholder="Password" secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
});