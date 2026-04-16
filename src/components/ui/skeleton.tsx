import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemedStyles } from '@/theme';

type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
};

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4
}) => {
  const styles = useThemedStyles(createStyles);
  
  return (
    <View style={[
      styles.skeleton,
      { width, height, borderRadius }
    ]} />
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  skeleton: {
    backgroundColor: theme.colors.divider
  }
});