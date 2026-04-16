import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';
import { fontSize } from '@/theme/typography';
import { spacing } from '@/theme/spacing';

export const createSettingsListStyles = (colors: ThemeColors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    setting: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: spacing.lg,
      marginBottom: spacing.md,
    },
    settingLabel: {
      fontSize: fontSize.md,
      color: colors.text,
    },
  });
};
