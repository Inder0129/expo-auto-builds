import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Button } from '@/src/components/ui/button';

type ScientificKeypadProps = {
  onNumberPress: (num: string) => void;
  onOperatorPress: (operator: string) => void;
  onDecimalPress: () => void;
  onClearPress: () => void;
  onEqualsPress: () => void;
  onScientificPress: (func: string) => void;
};

export const ScientificKeypad: React.FC<ScientificKeypadProps> = ({
  onNumberPress,
  onOperatorPress,
  onDecimalPress,
  onClearPress,
  onEqualsPress,
  onScientificPress,
}) => {
  const basicButtons = useMemo(() => [
    'C', '(', ')', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '=', '%',
  ], []);
  
  const scientificButtons = useMemo(() => [
    'sin', 'cos', 'tan',
    'log', 'ln', '√',
    'x²', 'x³', 'xʸ',
    'π', 'e', '±',
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
      case 'sin':
      case 'cos':
      case 'tan':
      case 'log':
      case 'ln':
      case '√':
      case 'x²':
      case 'x³':
      case 'xʸ':
      case 'π':
      case 'e':
      case '±':
        onScientificPress(value);
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
      <View style={{ flex: 2 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {scientificButtons.map((func) => (
            <Button
              key={func}
              variant="tertiary"
              size="medium"
              onPress={() => handlePress(func)}
              style={{ width: '33.33%' }}
            >
              {func}
            </Button>
          ))}
        </View>
      </View>
      <View style={{ flex: 3 }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {basicButtons.map((btn) => (
            <Button
              key={btn}
              variant={btn === '=' ? 'primary' : btn === 'C' ? 'danger' : 'secondary'}
              size="large"
              onPress={() => handlePress(btn)}
              style={{ width: '25%' }}
            >
              {btn}
            </Button>
          ))}
        </View>
      </View>
    </View>
  );
};
