import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../../src/components/ui';

export default function CheckoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <Button title="Place Order" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});