import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { fontSize } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export const createCalculatorDisplayStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: spacing.md,
      padding: spacing.lg,
      alignItems: 'flex-end',
      justifyContent: 'center',
      minHeight: 80,
    },
    text: {
      color: colors.text,
      fontSize: fontSize.xxl,
      fontWeight: '300',
    },
  });
};
