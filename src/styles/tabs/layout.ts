import { StyleSheet } from 'react-native';
import { ThemeColors } from '@/theme/colors';

export const createTabsLayoutStyles = (colors: ThemeColors) => StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
  },
  tabLabel: {
    color: colors.text,
  },
});
