import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { fontSize } from '@/theme/typography';

export const createThemeSelectorStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
  themesContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  themeButton: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  themeButtonActive: {
    backgroundColor: colors.primary,
  },
});
