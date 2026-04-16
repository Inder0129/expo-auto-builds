import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';

export const createLayoutStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
