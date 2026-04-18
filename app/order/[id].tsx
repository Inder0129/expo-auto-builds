import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors } from '@/src/theme';

export default function OrderScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const orderId = params.id;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order {orderId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
});