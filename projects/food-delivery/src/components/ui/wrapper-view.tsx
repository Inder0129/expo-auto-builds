import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/src/theme';

interface WrapperViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const WrapperView: React.FC<WrapperViewProps> = (props: WrapperViewProps) => {
  return <View style={[styles.wrapper, props.style]}>{props.children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

export { WrapperView };