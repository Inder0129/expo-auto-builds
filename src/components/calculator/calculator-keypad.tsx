import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Button } from '@/src/components/ui/button';
import { Icon } from '@/src/components/icons';

type CalculatorKeypadProps = {
  onNumberPress: (num: string) => void;
  onOperatorPress: (operator: string) => void;
  onDecimalPress: () => void;
  onClearPress: () => void;
  onEqualsPress: () => void;
};

export const CalculatorKeypad: React.FC<CalculatorKeypadProps> = ({
  onNumberPress,
  onOperatorPress,
  onDecimalPress,
  onClearPress,
  onEqualsPress,
}) => {
  const numberButtons = useMemo(() => [
    '7', '8', '9',
    '4', '5', '6',
    '1', '2', '3',
    '0', '.', '=',
  ], []);
  
  const operatorButtons = useMemo(() => [
    'C', '÷', '×', '-',
    '+', '(', ')', '%',
  ], []);
  
  const handlePress = (value: string) => {
    switch (value) {
      case 'C':
        onClearPress();
        break;
      case '.':
        onDecimalPress();
        break;
      case '=':
        onEqualsPress();
        break;
      case '÷':
      case '×':
      case '-':
      case '+':
      case '(':
      case ')':
      case '%':
        onOperatorPress(value);
        break;
      default:
        if (/\d/.test(value)) {
          onNumberPress(value);
        }
        break;
    }
  };
  
  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <View style={{ flex: 3 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {numberButtons.map((num) => (
            <Button
              key={num}
              variant={num === '=' ? 'primary' : 'secondary'}
              size="large"
              onPress={() => handlePress(num)}
              style={{ width: '33.33%' }}
            >
              {num}
            </Button>
          ))}
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {operatorButtons.map((op) => (
          <Button
            key={op}
            variant={op === 'C' ? 'danger' : 'tertiary'}
            size="large"
            onPress={() => handlePress(op)}
            style={{ marginBottom: 8 }}
          >
            {op}
          </Button>
        ))}
      </View>
    </View>
  );
};
