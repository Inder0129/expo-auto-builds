import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: spacing.sm,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  name: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: spacing.sm,
    flex: 1,
  },
  defaultBadge: {
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  defaultText: {
    ...typography.caption,
    color: colors.success,
    fontWeight: '600',
  },
  address: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    ...typography.caption,
    color: colors.primary,
    marginLeft: spacing.xs,
  },
});
