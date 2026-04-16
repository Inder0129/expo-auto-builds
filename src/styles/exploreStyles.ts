import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme';
import { moderateScaleFactor, spacing } from '@/theme';

export default (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
});