import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export const createSettingsStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    section: {
      marginBottom: spacing.lg,
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: spacing.md,
      marginHorizontal: spacing.lg,
      marginTop: spacing.lg,
    },
  });
};
