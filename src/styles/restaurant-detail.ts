import { StyleSheet } from 'react-native';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  menuContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  sectionHeader: {
    ...typography.h3,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
  reviewsSection: {
    backgroundColor: colors.surface,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
});
