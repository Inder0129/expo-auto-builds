import { StyleSheet } from 'react-native';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  cardsContainer: {
    padding: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
  linkContainer: {
    padding: spacing.md,
    alignItems: 'center',
  },
  linkButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  linkText: {
    ...typography.button,
    color: colors.white,
  },
  fabContainer: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
  },
});