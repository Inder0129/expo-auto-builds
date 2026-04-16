import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export const createSettingsStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      padding: spacing.lg,
    },
    themeSelector: {
      marginBottom: spacing.xl,
    },
    settingsList: {
      flex: 1,
    },
  });
};
