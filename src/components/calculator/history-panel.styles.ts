import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { fontSize } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export const createHistoryPanelStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
      fontSize: fontSize.lg,
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.md,
    },
    list: {
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
  });
};
