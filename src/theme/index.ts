import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export interface Theme {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
}

export const theme: Theme = {
  colors,
  typography,
  spacing
};

export function useThemedStyles<T extends StyleSheet.NamedStyles<T>>(
  createStyles: (theme: Theme) => T
) {
  return useMemo(() => createStyles(theme), [createStyles]);
}

export function moderateScaleFactor(size: number): number {
  return size;
}
