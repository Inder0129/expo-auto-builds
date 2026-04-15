import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { moderateScaleFactor, spacing } from '@/theme';

type CardProps = ViewProps & {
  children: React.ReactNode;
  style?: any;
};

export const Card: React.FC<CardProps> = ({ children, style, ...props }) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: moderateScaleFactor(12),
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: moderateScaleFactor(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: moderateScaleFactor(4),
    elevation: moderateScaleFactor(3),
  },
});