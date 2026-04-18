import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
    color: colors.text.primary,
  },
  menuSectionTitle: {
    ...typography.h4,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    color: colors.text.secondary,
  },
  errorText: {
    ...typography.body,
    textAlign: 'center',
    marginTop: spacing.xl,
    color: colors.text.secondary,
  },
});
