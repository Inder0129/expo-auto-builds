import { View } from 'react-native';
import { CalculatorDisplay } from '@/src/components/calculator/calculator-display';
import { CalculatorKeypad } from '@/src/components/calculator/calculator-keypad';
import { WrapperView } from '@/src/components/ui';
import { useCalculator } from '@/src/store/hooks';
import { useCallback } from 'react';
import { calculatorStyles } from '@/src/styles/calculator';

export default function CalculatorScreen() {
  const { displayValue, history, addToHistory, clearHistory } = useCalculator();

  const handleKeyPress = useCallback((key: string) => {
    console.log('Key pressed:', key);
  }, []);

  const handleClear = useCallback(() => {
    console.log('Clear pressed');
  }, []);

  const handleEquals = useCallback(() => {
    console.log('Equals pressed');
  }, []);

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
