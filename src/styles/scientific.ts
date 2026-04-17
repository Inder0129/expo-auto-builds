import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/src/theme/colors';

export const createScientificStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  keypadContainer: {
    flex: 2,
    padding: 10,
  },
});
