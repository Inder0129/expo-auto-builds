import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { fontSize } from '@/theme/typography';

export const createNumberFormatSelectorStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
  formatsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  formatButton: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  formatButtonActive: {
    backgroundColor: colors.primary,
  },
});
