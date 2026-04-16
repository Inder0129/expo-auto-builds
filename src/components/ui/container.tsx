import React from 'react';
import { View, ViewProps } from 'react-native';
import { useThemedStyles } from '../../theme';

type ContainerProps = ViewProps;

export function Container({ style, ...props }: ContainerProps) {
  const styles = useThemedStyles((theme) => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: theme.spacing.md
    }
  }));

  return <View style={[styles.container, style]} {...props} />;
}
