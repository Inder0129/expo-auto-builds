import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';

export const createSettingsStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.md,
      backgroundColor: colors.background
    }
  });
};
