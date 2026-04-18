import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export const exploreStyles = StyleSheet.create({
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
    marginBottom: spacing.md,
  },
  searchContainer: {
    marginBottom: spacing.lg,
  },
  filterSection: {
    marginBottom: spacing.lg,
  },
  filterList: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  restaurantList: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  restaurantCard: {
    marginBottom: spacing.md,
  },
});
