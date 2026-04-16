import React from 'react';
import { SafeAreaView } from 'react-native';
import { useThemedStyles, spacing } from '@/theme';

interface WrapperViewProps {
  children: React.ReactNode;
}

const WrapperView: React.FC<WrapperViewProps> = ({ children }) => {
  const styles = useThemedStyles();

  return <SafeAreaView style={styles.wrapperView}>{children}</SafeAreaView>;
};

export default WrapperView;