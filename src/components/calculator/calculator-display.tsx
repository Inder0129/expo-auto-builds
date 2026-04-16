import React from 'react';
import { Text, View } from 'react-native';
import { useThemedStyles } from '@/theme';
import createCalculatorDisplayStyles from '@/styles/calculator-display';

const CalculatorDisplay = () => {
  const styles = useThemedStyles(createCalculatorDisplayStyles);

  return <Text style={styles.display}>0</Text>;
};

export default CalculatorDisplay;