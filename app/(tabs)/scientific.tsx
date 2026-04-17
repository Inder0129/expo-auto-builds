import { View } from 'react-native';
import { CalculatorDisplay } from '@/src/components/calculator/calculator-display';
import { ScientificKeypad } from '@/src/components/calculator/scientific-keypad';
import { WrapperView } from '@/src/components/ui';
import { useCalculator } from '@/src/store/hooks';
import { useCallback } from 'react';
import { scientificStyles } from '@/src/styles/scientific';

export default function ScientificCalculatorScreen() {
  const { displayValue } = useCalculator();

  const handleKeyPress = useCallback((key: string) => {
    console.log('Scientific key pressed:', key);
  }, []);

  const handleScientificFunction = useCallback((func: string) => {
    console.log('Scientific function:', func);
  }, []);

  return (
    <WrapperView>
      <View style={scientificStyles.container}>
        <CalculatorDisplay value={displayValue} />
        <ScientificKeypad
          onKeyPress={handleKeyPress}
          onScientificFunction={handleScientificFunction}
        />
      </View>
    </WrapperView>
  );
}
