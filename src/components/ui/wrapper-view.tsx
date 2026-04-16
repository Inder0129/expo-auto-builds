import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemedStyles } from '@/theme';

type WrapperViewProps = {
  children: React.ReactNode;
  padding?: boolean;
};

export const WrapperView: React.FC<WrapperViewProps> = ({ children, padding = true }) => {
  const theme = useThemedStyles();
  
  return (
    <View style={[
      styles.wrapper,
      {
        backgroundColor: theme.colors.background,
        padding: padding ? theme.spacing.md : 0
      }
    ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
});