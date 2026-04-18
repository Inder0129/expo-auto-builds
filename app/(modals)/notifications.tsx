import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/theme';

export default function NotificationsModal() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notifications Modal</Text>
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