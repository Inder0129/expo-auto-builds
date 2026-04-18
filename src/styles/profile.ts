import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    borderRadius: spacing.sm,
    padding: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
  addAddressButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: spacing.sm,
  },
  addAddressText: {
    ...typography.body,
    marginLeft: spacing.sm,
    color: colors.primary,
  },
  logoutSection: {
    marginHorizontal: spacing.md,
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
});
