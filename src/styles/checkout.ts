import { StyleSheet } from 'react-native';
import { ViewStyle, TextStyle } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  } as ViewStyle,
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    padding: 16,
  } as ViewStyle,
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  } as ViewStyle,
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1D1F',
    marginLeft: 12,
  } as TextStyle,
});
