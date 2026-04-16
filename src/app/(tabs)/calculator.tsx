import React from 'react';
import { View } from 'react-native';
import { CalculatorDisplay } from '@/components/calculator/calculator-display';
import { CalculatorKeypad } from '@/components/calculator/calculator-keypad';
import { HistoryPanel } from '@/components/calculator/history-panel';
import { useThemedStyles } from '@/theme';
import { createCalculatorStyles } from '@/styles/tabs/calculator';

export default function CalculatorScreen() {
  const styles = useThemedStyles(createCalculatorStyles);

  return (
    <View style={styles.container}>
      <CalculatorDisplay />
      <CalculatorKeypad />
      <HistoryPanel />
    </View>
  );
}
