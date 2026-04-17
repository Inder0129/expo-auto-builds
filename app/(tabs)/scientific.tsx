import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CalculatorDisplay } from '@/src/components/calculator/calculator-display';
import { ScientificKeypad } from '@/src/components/scientific/scientific-keypad';
import { useAppSelector, useAppDispatch } from '@/src/store/hooks';
import { calculate, clear, inputNumber, inputOperator, inputDecimal, inputScientificFunction } from '@/src/store/slices/calculator';
import { addToHistory } from '@/src/store/slices/history';
import { createScientificStyles } from '@/src/styles/scientific';
import { useTheme } from '@/src/theme';

export default function ScientificScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createScientificStyles(theme.colors), [theme.colors]);
  
  const dispatch = useAppDispatch();
  const { displayValue, expression, currentValue } = useAppSelector(state => state.calculator);
  
  const handleNumberPress = useCallback((num: string) => {
    dispatch(inputNumber(num));
  }, [dispatch]);
  
  const handleOperatorPress = useCallback((operator: string) => {
    dispatch(inputOperator(operator));
  }, [dispatch]);
  
  const handleDecimalPress = useCallback(() => {
    dispatch(inputDecimal());
  }, [dispatch]);
  
  const handleClearPress = useCallback(() => {
    dispatch(clear());
  }, [dispatch]);
  
  const handleScientificPress = useCallback((func: string) => {
    dispatch(inputScientificFunction(func));
  }, [dispatch]);
  
  const handleEqualsPress = useCallback(() => {
    dispatch(calculate());
    if (expression && currentValue) {
      dispatch(addToHistory({
        expression,
        result: displayValue,
        timestamp: new Date().toISOString()
      }));
    }
  }, [dispatch, expression, currentValue, displayValue]);
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.displayContainer}>
        <CalculatorDisplay value={displayValue} expression={expression} />
      </View>
      <View style={styles.keypadContainer}>
        <ScientificKeypad
          onNumberPress={handleNumberPress}
          onOperatorPress={handleOperatorPress}
          onDecimalPress={handleDecimalPress}
          onClearPress={handleClearPress}
          onEqualsPress={handleEqualsPress}
          onScientificPress={handleScientificPress}
        />
      </View>
    </SafeAreaView>
  );
}
