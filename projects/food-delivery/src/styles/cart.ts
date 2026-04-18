import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  itemsContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  title: {
    ...typography.h1,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    color: colors.text.primary,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
});
