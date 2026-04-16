import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export const createClearHistoryButtonStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    button: {
      alignSelf: 'flex-end',
    },
  });
};
