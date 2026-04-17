import React, { useCallback, useMemo } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from '@/src/store/hooks';
import { calculate, clear, addToHistory } from '@/src/store/slices/calculator';
import { CalculatorDisplay } from '@/src/components/calculator/calculator-display';
import { CalculatorKeypad } from '@/src/components/calculator/calculator-keypad';
import { HistoryPanel } from '@/src/components/calculator/history-panel';
import { WrapperView } from '@/src/components/ui';
import { createCalculatorStyles } from '@/src/styles/calculator';
import { useThemeColors } from '@/src/theme';

export default function CalculatorScreen() {
  const colors = useThemeColors();
  const styles = createCalculatorStyles(colors);
  const dispatch = useDispatch();
  const { currentValue, expression, history } = useSelector((state) => state.calculator);

  const handleKeyPress = useCallback((key: string) => {
    if (key === '=') {
      dispatch(calculate());
      dispatch(addToHistory({ expression, result: currentValue }));
    } else if (key === 'C') {
      dispatch(clear());
    } else {
      dispatch(calculate({ input: key }));
    }
  }, [dispatch, expression, currentValue]);

  const memoizedHistory = useMemo(() => history.slice(-5), [history]);

  return (
    <SafeAreaView style={styles.container}>
      <WrapperView>
        <View style={styles.displayContainer}>
          <CalculatorDisplay value={currentValue} expression={expression} />
        </View>
        <View style={styles.keypadContainer}>
          <CalculatorKeypad onKeyPress={handleKeyPress} />
        </View>
        <View style={styles.historyContainer}>
          <HistoryPanel history={memoizedHistory} />
        </View>
      </WrapperView>
    </SafeAreaView>
  );
}
