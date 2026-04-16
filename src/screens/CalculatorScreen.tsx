import React, { useCallback } from 'react';
import { View } from 'react-native';
import { CalculatorDisplay } from '@/components/calculator/calculator-display';
import { CalculatorKeypad } from '@/components/calculator/calculator-keypad';
import { HistoryPanel } from '@/components/calculator/history-panel';
import { Container } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createCalculatorStyles } from '@/styles/calculator';

type CalculatorScreenProps = {};

export const CalculatorScreen: React.FC<CalculatorScreenProps> = () => {
  const styles = useThemedStyles(createCalculatorStyles);

  const handleKeyPress = useCallback((key: string) => {
    // Key press handler
  }, []);

  const handleClearHistory = useCallback(() => {
    // Clear history handler
  }, []);

  return (
    <Container style={styles.container}>
      <View style={styles.displayContainer}>
        <CalculatorDisplay />
      </View>
      <View style={styles.keypadContainer}>
        <CalculatorKeypad onKeyPress={handleKeyPress} />
      </View>
      <View style={styles.historyContainer}>
        <HistoryPanel onClearHistory={handleClearHistory} />
      </View>
    </Container>
  );
};
