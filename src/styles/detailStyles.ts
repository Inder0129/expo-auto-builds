import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme';
import { spacing } from '@/theme';

export const createDetailStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl
  }
});
