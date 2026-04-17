import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemedStyles } from '../../theme';

type ContainerProps = {
  children: React.ReactNode;
};

export const Container: React.FC<ContainerProps> = ({ children }) => {
  const styles = useThemedStyles((theme) => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md
    }
  }));

  return <View style={styles.container}>{children}</View>;
};