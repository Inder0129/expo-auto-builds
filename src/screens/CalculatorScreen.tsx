import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '@/theme';
import { CalculatorDisplay, CalculatorKeypad, HistoryPanel } from '@/components/calculator';
import { Container } from '@/components/ui';
import { useCalculator } from '@/store/hooks';
import { createCalculatorStyles } from '@/styles/calculator';

type CalculatorScreenProps = {};

export const CalculatorScreen: React.FC<CalculatorScreenProps> = () => {
  const styles = useThemedStyles(createCalculatorStyles);
  const { displayValue, history, handleKeyPress, clearHistory } = useCalculator();

  const onKeyPress = useCallback((key: string) => {
    handleKeyPress(key);
  }, [handleKeyPress]);

  const memoizedHistory = useMemo(() => history.slice(-5), [history]);

  return (
    <Container style={styles.container}>
      <View style={styles.displayContainer}>
        <CalculatorDisplay value={displayValue} />
      </View>
      <View style={styles.keypadContainer}>
        <CalculatorKeypad onKeyPress={onKeyPress} />
      </View>
      <View style={styles.historyContainer}>
        <HistoryPanel history={memoizedHistory} onClear={clearHistory} />
      </View>
    </Container>
  );
};
