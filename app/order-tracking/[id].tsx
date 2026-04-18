import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors, spacing, typography } from '@/src/theme';

export default function OrderTrackingScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const orderId = params.id;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Tracking {orderId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
});