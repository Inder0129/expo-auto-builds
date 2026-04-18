import { StyleSheet } from 'react-native';
import { colors, spacing } from '@/src/theme';

export const notificationsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: 18,
    color: colors.muted,
    marginTop: spacing.md,
  },
});
