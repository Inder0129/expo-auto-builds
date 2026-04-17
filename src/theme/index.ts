import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import colors from './colors';
import typography from './typography';
import spacing from './spacing';

export const useThemedStyles = (createStyles: any) => {
  const theme = useMemo(() => ({
    colors,
    typography,
    spacing,
    moderateScaleFactor: (size: number) => size
  }), []);
  return useMemo(() => createStyles(theme), [createStyles, theme]);
};

export { colors, typography, spacing };