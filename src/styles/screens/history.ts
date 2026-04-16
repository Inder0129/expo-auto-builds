import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { fontSize } from '@/theme/typography';

export const createHistoryStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  card: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  expression: {
    color: colors.text,
    fontSize: fontSize.md,
  },
  result: {
    color: colors.primary,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
  },
});
