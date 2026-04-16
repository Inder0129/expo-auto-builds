import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

type Theme = {
  colors: typeof colors.light;
  typography: typeof typography;
  spacing: typeof spacing;
};

export const useThemedStyles = () => {
  const colorScheme = useColorScheme();
  
  const theme = useMemo<Theme>(() => ({
    colors: colors[colorScheme === 'dark' ? 'dark' : 'light'],
    typography,
    spacing
  }), [colorScheme]);
  
  return theme;
};

export const moderateScaleFactor = (size: number, factor = 0.5) => {
  return size + (spacing.base * factor);
};