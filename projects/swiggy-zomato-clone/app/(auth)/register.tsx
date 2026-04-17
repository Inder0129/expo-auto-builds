import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from '../../src/components/ui';

export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Input placeholder="Name" />
      <Input placeholder="Email" />
      <Input placeholder="Password" secureTextEntry />
      <Button title="Register" />
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