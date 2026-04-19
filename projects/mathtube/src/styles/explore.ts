import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export const exploreStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  conceptsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginTop: spacing.lg,
  },
  conceptsTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  conceptsCount: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  conceptsList: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  conceptCard: {
    marginBottom: spacing.md,
  },
});