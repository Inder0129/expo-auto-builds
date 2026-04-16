import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { fontSize } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export const createSettingsItemStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: fontSize.lg,
      fontWeight: '600',
      color: colors.text,
      marginBottom: spacing.xs,
    },
    description: {
      fontSize: fontSize.sm,
      color: colors.textSecondary,
    },
    childrenContainer: {
      marginLeft: spacing.lg,
    },
  });
};
