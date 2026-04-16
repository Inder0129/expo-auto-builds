import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { fontSize } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export const createThemeSelectorStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {},
    title: {
      fontSize: fontSize.lg,
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.md,
    },
    themes: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    themeButton: {
      flex: 1,
      marginHorizontal: spacing.xs,
      backgroundColor: colors.surface,
      paddingVertical: spacing.md,
      borderRadius: spacing.md,
    },
    themeButtonActive: {
      backgroundColor: colors.primary,
    },
    themeButtonText: {
      fontSize: fontSize.md,
      color: colors.text,
      textAlign: 'center',
    },
    themeButtonTextActive: {
      color: colors.onPrimary,
      fontWeight: '600',
    },
  });
};
