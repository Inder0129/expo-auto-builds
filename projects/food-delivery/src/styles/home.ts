import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  searchContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h3,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  categoryList: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  offerList: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  restaurantCard: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
});
