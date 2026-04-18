import { StyleSheet } from 'react-native';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  itemsContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  cartTitle: {
    ...typography.h2,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    color: colors.textPrimary,
  },
  summaryContainer: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
});
