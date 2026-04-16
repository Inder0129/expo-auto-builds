import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemedStyles } from '@/theme';

type WrapperViewProps = {
  children: React.ReactNode;
  padding?: boolean;
};

export const WrapperView: React.FC<WrapperViewProps> = ({ children, padding = true }) => {
  const styles = useThemedStyles(createStyles);
  
  return (
    <View style={[
      styles.wrapper,
      padding && styles.padding
    ]}>
      {children}
    </View>
  );
};

const createStyles = (theme: any) => StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  padding: {
    padding: theme.spacing.md
  }
});