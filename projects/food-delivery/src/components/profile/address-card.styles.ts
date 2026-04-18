import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export default StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    ...typography.bodyBold,
    color: colors.text,
    marginLeft: spacing.xs,
    marginRight: spacing.sm,
  },
  defaultBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    ...typography.caption,
    color: colors.primary,
  },
  address: {
    ...typography.body,
    color: colors.textLight,
    lineHeight: 20,
  },
});
