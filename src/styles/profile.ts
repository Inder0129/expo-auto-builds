import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
    color: colors.text,
  },
  menuCard: {
    borderRadius: spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  addAddressButton: {
    marginTop: spacing.md,
  },
  logoutButton: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  versionText: {
    ...typography.body,
    color: colors.textLight,
  },
});
