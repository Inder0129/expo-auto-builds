import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createCalculatorStyles } from '@/styles/calculator';

type CalculatorKeypadProps = {
  onKeyPress: (key: string) => void;
};

export const CalculatorKeypad: React.FC<CalculatorKeypadProps> = ({ onKeyPress }) => {
  const styles = useThemedStyles(createCalculatorStyles);

  const handlePress = useCallback((key: string) => {
    onKeyPress(key);
  }, [onKeyPress]);

  const keys = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  return (
    <View style={styles.keypadContainer}>
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <Button
              key={key}
              title={key}
              onPress={() => handlePress(key)}
              style={styles.keyButton}
            />
          ))}
        </View>
      ))}
    </View>
  );
};
