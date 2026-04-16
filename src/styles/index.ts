import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';

export const createIndexStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
