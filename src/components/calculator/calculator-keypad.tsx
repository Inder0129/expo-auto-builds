import { View } from 'react-native';
import { useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { pressKey } from '@/store/slices/calculator';
import { Button } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createCalculatorKeypadStyles } from '@/styles/components/calculator-keypad';

export function CalculatorKeypad() {
  const dispatch = useAppDispatch();
  const styles = useThemedStyles(createCalculatorKeypadStyles);

  const handleKeyPress = useCallback((key: string) => {
    dispatch(pressKey(key));
  }, [dispatch]);

  const keys = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  return (
    <View style={styles.container}>
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <Button
              key={key}
              title={key}
              onPress={() => handleKeyPress(key)}
              style={styles.button}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
