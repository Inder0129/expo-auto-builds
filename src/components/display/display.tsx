import React from 'react';
import { Text, View } from 'react-native';
import { useThemedStyles } from '@/theme';
import { createDisplayStyles } from './display.styles';

interface Props {
  result: string;
}

const Display = ({ result }: Props) => {
  const styles = useThemedStyles(createDisplayStyles);

  return <Text style={styles.text}>{result}</Text>;
};

export { Display };