import { useColorScheme } from 'react-native';
import { lightColors, darkColors } from './colors';
import { typography } from './typography';
import { spacing, borderRadius, moderateScaleFactor } from './spacing';

export type ThemeColors = typeof lightColors;

export const theme = {
  light: { colors: lightColors, typography, spacing, borderRadius, moderateScaleFactor },
  dark: { colors: darkColors, typography, spacing, borderRadius, moderateScaleFactor },
} as const;

export const useColors = () => {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkColors : lightColors;
};

export const useThemedStyles = (stylesFn: (colors: ThemeColors) => any) => {
  const colors = useColors();
  return stylesFn(colors);
};