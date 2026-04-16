import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';

export const createLayoutStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
};
