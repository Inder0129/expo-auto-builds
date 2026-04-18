import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...typography.body,
    color: colors.textPrimary,
    marginLeft: spacing.md,
  },
});
