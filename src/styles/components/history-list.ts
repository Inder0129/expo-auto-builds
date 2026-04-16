import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { fontSize } from '@/theme/typography';

export const createHistoryListStyles = (colors: ThemeColors) => StyleSheet.create({
  listContent: {
    flexGrow: 1,
    gap: spacing.sm,
  },
  item: {
    padding: spacing.md,
  },
  itemText: {
    color: colors.text,
    fontSize: fontSize.md,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: fontSize.lg,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
