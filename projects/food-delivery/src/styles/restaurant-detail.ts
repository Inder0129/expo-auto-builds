import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  notFoundText: {
    ...typography.h2,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  categoriesContainer: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
  },
  categoriesScroll: {
    paddingHorizontal: spacing.md,
  },
  categoryButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.background,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  categoryTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  menuSection: {
    padding: spacing.md,
  },
  reviewsSection: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    marginTop: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  ratingText: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  viewAllButton: {
    marginTop: spacing.md,
  },
});
