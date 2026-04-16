import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export const moderateScaleFactor = 1;

export function useThemedStyles<T extends StyleSheet.NamedStyles<T>>(createStyles: (theme: Theme) => T): T {
  const theme = useMemo(() => ({
    colors,
    typography,
    spacing
  }), []);
  return useMemo(() => createStyles(theme), [theme, createStyles]);
}

export interface Theme {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
}
