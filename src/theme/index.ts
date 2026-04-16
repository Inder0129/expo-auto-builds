import { useTheme } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius, moderateScaleFactor } from './spacing';

export type ThemeColors = typeof colors;

export const useThemedStyles = () => {
  const theme = useTheme();
  return theme;
};

export const useColors = () => {
  const theme = useTheme();
  return theme.colors;
};

export { colors, typography, spacing, borderRadius, moderateScaleFactor };