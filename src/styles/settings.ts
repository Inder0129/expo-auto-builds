import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';

export const createSettingsStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
});
