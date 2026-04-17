import { View } from 'react-native';
import { CalculatorDisplay } from '@/src/components/calculator/calculator-display';
import { CalculatorKeypad } from '@/src/components/calculator/calculator-keypad';
import { WrapperView } from '@/src/components/ui';
import { useCallback, useState } from 'react';
import { calculatorStyles } from '@/src/styles/calculator';

export default function CalculatorScreen() {
  const [displayValue, setDisplayValue] = useState('0');
  const [history, setHistory] = useState<Array<{expression: string, result: string}>>([]);

  const handleKeyPress = useCallback((key: string) => {
    setDisplayValue(prev => prev === '0' ? key : prev + key);
  }, []);

  const handleClear = useCallback(() => {
    setDisplayValue('0');
  }, []);

  const handleEquals = useCallback(() => {
    try {
      const result = eval(displayValue).toString();
      setHistory(prev => [...prev, {expression: displayValue, result}]);
      setDisplayValue(result);
    } catch (error) {
      setDisplayValue('Error');
    }
  }, [displayValue]);

  return (
    <WrapperView>
      <View style={calculatorStyles.container}>
        <CalculatorDisplay value={displayValue} />
        <CalculatorKeypad
          onKeyPress={handleKeyPress}
          onClear={handleClear}
          onEquals={handleEquals}
        />
      </View>
    </WrapperView>
  );
}