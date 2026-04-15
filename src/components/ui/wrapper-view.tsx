import React from 'react';
import { SafeAreaView } from 'react-native';
import { useThemedStyles, moderateScaleFactor, spacing, fontSize } from '@/theme';

interface WrapperViewProps {
  children: React.ReactNode;
}

const WrapperView: React.FC<WrapperViewProps> = ({ children }) => {
  const styles = useThemedStyles();
  const scaleFactor = moderateScaleFactor();

  return <SafeAreaView style={styles.wrapperView}>{children}</SafeAreaView>;
};

export default WrapperView;