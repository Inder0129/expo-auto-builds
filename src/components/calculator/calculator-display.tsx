import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { useThemedStyles } from '@/theme';
import { createCalculatorDisplayStyles } from './calculator-display.styles';

type CalculatorDisplayProps = {
  value: string;
  style?: ViewStyle;
};

export function CalculatorDisplay({ value, style }: CalculatorDisplayProps) {
  const styles = useThemedStyles(createCalculatorDisplayStyles);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}
