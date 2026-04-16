import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { fontSize } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export const createCalculatorKeypadStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      marginBottom: spacing.sm,
    },
    button: {
      flex: 1,
      marginHorizontal: spacing.xs,
      backgroundColor: colors.surface,
      borderRadius: spacing.md,
    },
    buttonText: {
      fontSize: fontSize.xl,
      color: colors.text,
    },
  });
};
