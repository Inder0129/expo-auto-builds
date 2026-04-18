import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.lg,
    marginTop: spacing.md,
    marginHorizontal: spacing.md,
    borderRadius: spacing.sm,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.border,
  },
  infoContainer: {
    flex: 1,
    marginLeft: spacing.lg,
  },
  name: {
    ...typography.h2,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  email: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  phone: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
