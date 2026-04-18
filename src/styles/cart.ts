import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  itemsContainer: {
    flex: 1,
  },
  itemsContentContainer: {
    padding: spacing.lg,
  },
  summaryContainer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  checkoutButton: {
    marginTop: spacing.lg,
  },
});
