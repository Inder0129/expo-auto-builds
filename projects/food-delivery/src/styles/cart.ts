import { StyleSheet } from 'react-native';
import { colors, spacing } from '@/src/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  itemsContainer: {
    padding: spacing.md,
  },
  checkoutContainer: {
    padding: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
