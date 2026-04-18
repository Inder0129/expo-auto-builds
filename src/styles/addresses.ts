import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyText: {
    ...typography.bodyLarge,
    color: colors.gray600,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
    paddingVertical: spacing.lg,
    borderRadius: 12,
  },
  addButtonText: {
    ...typography.subtitle,
    color: colors.white,
    marginLeft: spacing.sm,
  },
});
