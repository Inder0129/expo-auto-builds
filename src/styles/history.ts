import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export const createHistoryStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      padding: spacing.lg,
      alignItems: 'flex-end',
    },
    listContainer: {
      flex: 1,
      paddingHorizontal: spacing.md,
    },
  });
};
