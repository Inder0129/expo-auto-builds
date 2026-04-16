import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { useThemedStyles } from '../../theme';

export interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'body' | 'caption';
}

export function Text({ children, variant = 'body' }: TextProps) {
  const styles = useThemedStyles(createStyles);
  
  return <RNText style={styles[variant]}>{children}</RNText>;
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    h1: {
      ...theme.typography.h1,
      color: theme.colors.text
    },
    h2: {
      ...theme.typography.h2,
      color: theme.colors.text
    },
    body: {
      ...theme.typography.body,
      color: theme.colors.text
    },
    caption: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary
    }
  });
