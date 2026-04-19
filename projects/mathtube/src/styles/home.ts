import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  searchBar: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  videoPlayer: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
});