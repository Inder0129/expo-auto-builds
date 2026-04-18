import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchBar: {
    marginBottom: spacing.sm,
  },
  section: {
    marginBottom: spacing.xl,
    paddingTop: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    ...typography.headingSmall,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  resultCount: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  categoryGrid: {
    paddingHorizontal: spacing.md,
  },
  filterList: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  filterChip: {
    marginRight: spacing.sm,
  },
  restaurantList: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  restaurantCard: {
    marginBottom: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl * 2,
    paddingHorizontal: spacing.xl,
  },
  emptyStateTitle: {
    ...typography.headingSmall,
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  emptyStateText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
