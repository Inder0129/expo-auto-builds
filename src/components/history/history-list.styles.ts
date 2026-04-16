import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { fontSize } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export const createHistoryListStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      marginBottom: spacing.sm,
      padding: spacing.md,
    },
    itemText: {
      fontSize: fontSize.md,
      color: colors.text,
    },
    empty: {
      fontSize: fontSize.md,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: spacing.xl,
    },
  });
};
