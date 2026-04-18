import { StyleSheet } from 'react-native';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs
  },
  locationText: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    marginHorizontal: spacing.xs
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center'
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md
  },
  sectionTitle: {
    ...typography.headingSmall,
    color: colors.textPrimary
  },
  seeAllLink: {
    textDecorationLine: 'none'
  },
  seeAllText: {
    ...typography.bodyMedium,
    color: colors.primary
  },
  promoCard: {
    marginBottom: spacing.xl
  },
  promoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  promoTextContainer: {
    flex: 1,
    marginRight: spacing.md
  },
  promoTitle: {
    ...typography.headingSmall,
    color: colors.textPrimary,
    marginBottom: spacing.xs
  },
  promoDescription: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginBottom: spacing.md
  },
  promoButton: {
    alignSelf: 'flex-start'
  },
  promoImage: {
    width: 100,
    height: 100,
    borderRadius: 8
  }
});