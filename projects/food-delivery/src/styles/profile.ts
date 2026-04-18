import { StyleSheet } from 'react-native';
import { colors, spacing } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    padding: spacing.md,
    backgroundColor: colors.background,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  logoutSection: {
    padding: spacing.md,
    marginTop: spacing.lg,
  },
});
