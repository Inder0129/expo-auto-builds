import React from 'react';
import { View } from 'react-native';
import { useThemedStyles, moderateScaleFactor, spacing } from '@/theme';

const Skeleton: React.FC = () => {
  const styles = useThemedStyles();

  return <View style={[styles.skeleton, { width: moderateScaleFactor(100), height: moderateScaleFactor(20) }]} />;
};

export default Skeleton;