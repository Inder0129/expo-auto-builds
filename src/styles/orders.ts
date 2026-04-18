import { StyleSheet } from 'react-native';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md
  },
  title: {
    ...typography.headingLarge,
    color: colors.textPrimary
  },
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center'
  },
  section: {
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md
  },
  sectionTitle: {
    ...typography.headingSmall,
    color: colors.textPrimary,
    marginBottom: spacing.md
  },
  seeAllText: {
    ...typography.bodyMedium,
    color: colors.primary
  },
  supportCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.xl,
    marginBottom: spacing.xl
  },
  supportContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md
  },
  supportTextContainer: {
    flex: 1
  },
  supportTitle: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    marginBottom: spacing.xs
  },
  supportDescription: {
    ...typography.bodySmall,
    color: colors.textSecondary
  }
});