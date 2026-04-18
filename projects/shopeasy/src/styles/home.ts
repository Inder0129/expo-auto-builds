import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
  },
  viewAllLink: {
    paddingVertical: spacing.xs,
  },
  viewAllText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary,
  },
  viewAllButton: {
    paddingHorizontal: 0,
  },
  productList: {
    paddingRight: spacing.md,
  },
  productCard: {
    marginRight: spacing.md,
    width: 160,
  },
});
