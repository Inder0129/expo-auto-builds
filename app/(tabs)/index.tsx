import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CalculatorDisplay } from '@/src/components/calculator/calculator-display';
import { CalculatorKeypad } from '@/src/components/calculator/calculator-keypad';
import { useAppSelector, useAppDispatch } from '@/src/store/hooks';
import { calculate, clear, inputNumber, inputOperator, inputDecimal } from '@/src/store/slices/calculator';
import { addToHistory } from '@/src/store/slices/history';
import { createCalculatorStyles } from '@/src/styles/calculator';
import { useTheme } from '@/src/theme';

export default function CalculatorScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createCalculatorStyles(theme.colors), [theme.colors]);
  
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
        <CalculatorKeypad
          onNumberPress={handleNumberPress}
          onOperatorPress={handleOperatorPress}
          onDecimalPress={handleDecimalPress}
          onClearPress={handleClearPress}
          onEqualsPress={handleEqualsPress}
        />
      </View>
    </SafeAreaView>
  );
}
