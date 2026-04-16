import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export const createCalculatorStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      padding: spacing.lg,
    },
    display: {
      marginBottom: spacing.xl,
    },
    keypad: {
      flex: 1,
    },
    history: {
      marginTop: spacing.lg,
    },
  });
};
