import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { moderateScaleFactor } from '@/theme';

type SkeletonProps = ViewProps & {
  width?: number;
  height?: number;
  style?: any;
};

export const Skeleton: React.FC<SkeletonProps> = ({ width, height, style, ...props }) => {
  return (
    <View
      style={[
        styles.skeleton,
        width && { width },
        height && { height },
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    width: '100%',
    height: moderateScaleFactor(20),
    backgroundColor: '#e1e8ed',
    borderRadius: moderateScaleFactor(4),
  },
});