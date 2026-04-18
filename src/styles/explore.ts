import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  categoriesSection: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  filtersSection: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  filtersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  clearText: {
    ...typography.caption,
    color: colors.primary,
  },
  filtersList: {
    gap: spacing.sm,
  },
  filterItem: {
    marginRight: spacing.sm,
  },
  restaurantsSection: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  restaurantsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: 16,
    backgroundColor: colors.surface,
  },
  sortText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  restaurantsList: {
    gap: spacing.md,
  },
  restaurantItem: {
    marginBottom: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyDescription: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    maxWidth: 250,
  },
  clearButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 24,
    backgroundColor: colors.primary,
  },
  clearButtonText: {
    ...typography.button,
    color: colors.white,
  },
});

export default styles;
