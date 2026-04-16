import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { fontSize } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export const createClearHistoryButtonStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    button: {
      backgroundColor: colors.error,
      paddingVertical: spacing.md,
      borderRadius: spacing.md,
    },
    buttonText: {
      fontSize: fontSize.md,
      color: colors.onError,
      fontWeight: '600',
    },
  });
};
