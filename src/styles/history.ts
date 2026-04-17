import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';

export const createHistoryStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    alignItems: 'flex-end',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
});
