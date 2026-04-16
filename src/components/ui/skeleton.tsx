import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemedStyles } from '@/theme';

type SkeletonProps = {
  width?: number | string;
  height?: number;
  borderRadius?: number;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4
}) => {
  const theme = useThemedStyles();
  
  return (
    <View style={[
      styles.skeleton,
      {
        width,
        height,
        borderRadius,
        backgroundColor: theme.colors.border
      }
    ]} />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    opacity: 0.7
  }
});