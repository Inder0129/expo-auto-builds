import { StyleSheet } from 'react-native';
import { colors, spacing } from '@/src/theme';

export const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  suggestionsList: {
    paddingBottom: spacing.xl,
  },
});
