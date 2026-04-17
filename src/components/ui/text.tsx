import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { useThemedStyles } from '../../theme';

type TextProps = {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'body' | 'caption';
};

export const Text: React.FC<TextProps> = ({ children, variant = 'body' }) => {
  const styles = useThemedStyles((theme) => ({
    text: {
      color: theme.colors.text,
      ...theme.typography[variant]
    }
  }));

  return <RNText style={styles.text}>{children}</RNText>;
};