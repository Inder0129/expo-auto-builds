import React from 'react';
import { Text, View } from 'react-native';
import { useThemedStyles } from '@/theme';
import createCalculatorDisplayStyles from '@/styles/calculator-display';

interface CalculatorDisplayProps {
  result: string;
  currentNumber: string;
}

const CalculatorDisplay = ({ result, currentNumber }: CalculatorDisplayProps) => {
  const styles = useThemedStyles(createCalculatorDisplayStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.result}>{result}</Text>
      <Text style={styles.currentNumber}>{currentNumber}</Text>
    </View>
  );
};

export default CalculatorDisplay;