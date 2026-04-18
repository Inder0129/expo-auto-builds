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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  locationText: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  profileButton: {
    padding: spacing.xs,
  },
  searchBar: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.xl,
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
  seeAllText: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
  },
  categoryList: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  categoryCard: {
    width: 80,
  },
  offerList: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  offerBanner: {
    width: 300,
    height: 120,
  },
  restaurantList: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  restaurantCard: {
    marginBottom: spacing.md,
  },
});
