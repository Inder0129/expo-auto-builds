import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors } from '@/src/theme';

export default function OrderTrackingModal() {
  const params = useLocalSearchParams<{ id: string }>();
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Order Tracking ID: {params.id}</Text>
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