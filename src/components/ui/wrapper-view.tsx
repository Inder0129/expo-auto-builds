import React from 'react';
import { SafeAreaView, View, StyleSheet, ViewProps } from 'react-native';
import { spacing } from '@/theme';

type WrapperViewProps = ViewProps & {
  children: React.ReactNode;
  safeArea?: boolean;
  style?: any;
};

export const WrapperView: React.FC<WrapperViewProps> = ({
  children,
  safeArea = true,
  style,
  ...props
}) => {
  const Container = safeArea ? SafeAreaView : View;
  
  return (
    <Container style={[styles.container, style]} {...props}>
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: '#f5f5f5',
  },
});