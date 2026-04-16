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
      padding: spacing.lg,
    },
    keypadContainer: {
      flex: 3,
      padding: spacing.md,
    },
    historyContainer: {
      flex: 2,
      padding: spacing.md,
    },
  });
};
