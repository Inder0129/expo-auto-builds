import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.md,
  },
  cartSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cartInfo: {
    flex: 1,
  },
  itemCount: {
    ...typography.body,
    color: colors.textSecondary,
  },
  total: {
    ...typography.h4,
    marginTop: spacing.xs,
  },
  viewCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 4,
  },
  viewCartText: {
    ...typography.body,
    color: colors.onPrimary,
    fontWeight: 'bold',
    marginRight: spacing.xs,
  },
  checkoutButton: {
    marginTop: spacing.sm,
  },
});
