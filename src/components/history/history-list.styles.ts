import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { fontSize } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export const createHistoryListStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    listContent: {
      paddingBottom: spacing.lg,
    },
    itemCard: {
      marginBottom: spacing.sm,
      padding: spacing.md,
    },
    itemText: {
      fontSize: fontSize.md,
      color: colors.text,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: spacing.xl,
    },
    emptyText: {
      fontSize: fontSize.lg,
      color: colors.textSecondary,
    },
  });
};
