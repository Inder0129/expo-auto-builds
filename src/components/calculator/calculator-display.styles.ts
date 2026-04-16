import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { fontSize } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export const createCalculatorDisplayStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      alignItems: 'flex-end',
    },
    value: {
      fontSize: fontSize.xxl,
      color: colors.text,
      fontWeight: '300',
    },
  });
};
