import { StyleSheet } from 'react-native';
import { ViewStyle, TextStyle } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  } as ViewStyle,
  header: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
  } as ViewStyle,
  orderId: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1D1D1F',
    marginBottom: 4,
  } as TextStyle,
  estimatedTime: {
    fontSize: 16,
    color: '#FF6B35',
  } as TextStyle,
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    padding: 16,
  } as ViewStyle,
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 12,
  } as TextStyle,
});
