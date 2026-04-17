import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export const createThemeSwitcherStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      gap: spacing.md,
    },
    themeOption: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: spacing.sm,
      backgroundColor: colors.surfaceVariant,
    },
    themeOptionActive: {
      backgroundColor: colors.primary + '20',
    },
    radioOuter: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors.textSecondary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.md,
    },
    radioOuterActive: {
      borderColor: colors.primary,
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.primary,
    },
    themeLabel: {
      fontSize: typography.fontSize.md,
      color: colors.text,
    },
  });
};
