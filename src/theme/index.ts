import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export const useThemedStyles = <T extends StyleSheet.NamedStyles<T>>(
  createStyles: (theme: Theme) => T
) => {
  const theme = useMemo(() => ({
    colors,
    typography,
    spacing,
    moderateScale: (size: number, factor = 0.5) => {
      return size + (spacing.moderateScaleFactor * factor);
    }
  }), []);

  return useMemo(() => createStyles(theme), [theme]);
};

export type Theme = {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
  moderateScale: (size: number, factor?: number) => number;
};