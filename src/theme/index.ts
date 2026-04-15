import { useTheme } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export type ThemeColors = typeof colors;

export const useThemedStyles = () => {
  const theme = useTheme();
  return {
    colors: colors[theme.name],
    typography,
    spacing,
  };
};

export const useColors = () => {
  const { colors } = useThemedStyles();
  return colors;
};