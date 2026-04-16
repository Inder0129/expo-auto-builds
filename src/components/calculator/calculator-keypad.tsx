import React, { useCallback } from 'react';
import { View, ViewStyle } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Button } from '@/components/ui';
import { useAppDispatch } from '@/store/hooks';
import { calculatorActions } from '@/store/slices/calculator';
import { createCalculatorKeypadStyles } from './calculator-keypad.styles';

type CalculatorKeypadProps = {
  onKeyPress?: (key: string) => void;
  style?: ViewStyle;
};

export function CalculatorKeypad({ onKeyPress, style }: CalculatorKeypadProps) {
  const styles = useThemedStyles(createCalculatorKeypadStyles);
  const dispatch = useAppDispatch();

  const handlePress = useCallback(
    (key: string) => {
      dispatch(calculatorActions.pressKey(key));
      onKeyPress?.(key);
    },
    [dispatch, onKeyPress]
  );

  const keys = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  return (
    <View style={[styles.container, style]}>
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <Button
              key={key}
              title={key}
              onPress={() => handlePress(key)}
              style={styles.button}
              textStyle={styles.buttonText}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
