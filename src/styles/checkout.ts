import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  section: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    marginBottom: spacing.sm,
    borderRadius: spacing.sm
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
    color: colors.textPrimary
  },
  footer: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border
  }
});