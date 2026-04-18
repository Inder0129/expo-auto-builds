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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  locationText: {
    ...typography.body,
    color: colors.textPrimary,
    marginHorizontal: spacing.xs,
  },
  notificationButton: {
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
  },
  offersSection: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  seeAllLink: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  seeAllText: {
    ...typography.caption,
    color: colors.primary,
  },
  categoriesList: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  categoryItem: {
    width: 80,
  },
  offersList: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  offerItem: {
    width: 300,
  },
  featuredSection: {
    marginBottom: spacing.xl,
  },
  restaurantCard: {
    width: 280,
    marginRight: spacing.md,
  },
});

export default styles;
