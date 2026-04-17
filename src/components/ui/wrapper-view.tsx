import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemedStyles } from '../../theme';

type WrapperViewProps = {
  children: React.ReactNode;
};

export const WrapperView: React.FC<WrapperViewProps> = ({ children }) => {
  const styles = useThemedStyles(createStyles);
  return <View style={styles.wrapper}>{children}</View>;
};

const createStyles = (theme: any) => StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md
  }
});