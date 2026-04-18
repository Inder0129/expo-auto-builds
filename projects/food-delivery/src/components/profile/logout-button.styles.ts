import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: spacing.sm,
  },
  text: {
    ...typography.body,
    color: colors.error,
    marginLeft: spacing.sm,
    fontWeight: '600',
  },
});
