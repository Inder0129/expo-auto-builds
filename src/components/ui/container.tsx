import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemedStyles } from '../../theme';

export interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  const styles = useThemedStyles(createStyles);
  
  return <View style={styles.container}>{children}</View>;
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md
    }
  });
