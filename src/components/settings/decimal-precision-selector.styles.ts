import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export const createDecimalPrecisionSelectorStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    precisionOption: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderRadius: spacing.md,
      backgroundColor: colors.surfaceVariant,
      minWidth: 60,
      alignItems: 'center',
    },
    precisionOptionActive: {
      backgroundColor: colors.primary,
    },
    precisionLabel: {
      fontSize: typography.fontSize.md,
      color: colors.text,
    },
    precisionLabelActive: {
      color: colors.onPrimary,
      fontWeight: typography.fontWeight.semiBold,
    },
  });
};
