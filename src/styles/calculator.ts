import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export const createCalculatorStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    displayContainer: {
      flex: 2,
      justifyContent: 'flex-end',
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    keypadContainer: {
      flex: 3,
      padding: spacing.md,
    },
    historyContainer: {
      flex: 1,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
    },
  });
};
