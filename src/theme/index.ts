import { ThemeColors } from './types';
import colors from './colors';
import typography from './typography';
import spacing from './spacing';

export const moderateScaleFactor = 1;
export const borderRadius = 10;
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  moderateScaleFactor
};
export const useThemedStyles = () => {};
export const useColors = () => ({} as ThemeColors);