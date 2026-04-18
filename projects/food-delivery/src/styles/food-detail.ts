import { StyleSheet } from 'react-native';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  } as ViewStyle,
  contentContainer: {
    padding: 16,
  } as ViewStyle,
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  } as ViewStyle,
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1D1D1F',
    flex: 1,
  } as TextStyle,
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  } as TextStyle,
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  } as ViewStyle,
  ratingText: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 4,
    marginRight: 16,
  } as TextStyle,
  preparationTime: {
    fontSize: 14,
    color: '#8E8E93',
  } as TextStyle,
  description: {
    fontSize: 16,
    color: '#3C3C43',
    lineHeight: 24,
    marginBottom: 24,
  } as TextStyle,
});
