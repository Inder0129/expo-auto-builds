import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Button } from '@/components/ui';
import { createCalculatorKeypadStyles } from './calculator-keypad.styles';

type CalculatorKeypadProps = {
  onKeyPress: (key: string) => void;
};

export const CalculatorKeypad: React.FC<CalculatorKeypadProps> = ({ onKeyPress }) => {
  const styles = useThemedStyles(createCalculatorKeypadStyles);

  const keys = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  const handlePress = useCallback((key: string) => {
    onKeyPress(key);
  }, [onKeyPress]);

  const getButtonType = (key: string) => {
    if (['÷', '×', '-', '+', '='].includes(key)) return 'primary';
    if (['C', '±', '%'].includes(key)) return 'secondary';
    return 'default';
  };

  return (
    <View style={styles.container}>
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <Button
              key={key}
              title={key}
              type={getButtonType(key)}
              onPress={() => handlePress(key)}
              style={key === '0' ? styles.zeroButton : styles.button}
            />
          ))}
        </View>
      ))}
    </View>
  );
};
