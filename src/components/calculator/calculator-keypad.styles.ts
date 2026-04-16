import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export const createCalculatorKeypadStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing.sm,
    },
    button: {
      flex: 1,
      marginHorizontal: spacing.xs,
      height: 70,
    },
    zeroButton: {
      flex: 2,
      marginHorizontal: spacing.xs,
      height: 70,
    },
  });
};
