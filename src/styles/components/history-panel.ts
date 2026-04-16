import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { fontSize } from '@/theme/typography';

export const createHistoryPanelStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: '600',
  },
  item: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  itemText: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
  },
});
