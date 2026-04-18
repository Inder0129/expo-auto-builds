import { StyleSheet } from 'react-native';
import { colors, spacing } from '@/src/theme';

export const offersStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  promoSection: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
  },
  appliedSection: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
  },
  offersSection: {
    padding: spacing.md,
    backgroundColor: colors.surface,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  appliedCode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.primaryLight,
    borderRadius: 8,
    marginBottom: spacing.xs,
  },
  appliedCodeText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
  },
  noOffersText: {
    fontSize: 16,
    color: colors.muted,
    textAlign: 'center',
    padding: spacing.lg,
  },
});
