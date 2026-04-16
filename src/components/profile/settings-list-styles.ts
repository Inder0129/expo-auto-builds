import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme';
import { moderateScaleFactor, spacing, fontSize } from '@/theme';

export default (colors: ThemeColors) => StyleSheet.create({
  container: {
    marginTop: spacing.sm,
  },
  card: {
    marginBottom: spacing.sm,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  icon: {
    marginRight: spacing.md,
    color: colors.textSecondary,
  },
  settingTitle: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  chevron: {
    color: colors.textSecondary,
  },
});