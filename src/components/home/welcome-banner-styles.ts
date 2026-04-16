import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme';
import { moderateScaleFactor, spacing, fontSize } from '@/theme';

export default (colors: ThemeColors) => StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  userName: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
});