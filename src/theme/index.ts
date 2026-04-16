import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export const useThemedStyles = <T extends StyleSheet.NamedStyles<T>>(styles: (props: any) => T, props?: any): T => {
  return useMemo(() => styles(props), [props]);
};

export const moderateScaleFactor = (size: number, factor = 0.5): number => {
  return size + (size * factor);
};