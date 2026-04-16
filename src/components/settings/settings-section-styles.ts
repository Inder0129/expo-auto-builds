import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { spacing } from '@/theme/spacing';
import { fontSize } from '@/theme/typography';

export const createSettingsSectionStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border
    },
    leftContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1
    },
    icon: {
      color: colors.primary,
      marginRight: spacing.md
    },
    title: {
      fontSize: fontSize.md,
      color: colors.text,
      flex: 1
    },
    chevron: {
      color: colors.secondaryText
    }
  });
};
