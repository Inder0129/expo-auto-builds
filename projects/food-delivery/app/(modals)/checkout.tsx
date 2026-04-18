import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/theme';

export default function CheckoutModal() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Checkout Modal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: colors.text,
  },
});