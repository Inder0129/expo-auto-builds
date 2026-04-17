import { View } from 'react-native';
import { CalculatorDisplay } from '@/src/components/calculator/calculator-display';
import { ScientificKeypad } from '@/src/components/calculator/scientific-keypad';
import { WrapperView } from '@/src/components/ui';
import { useCallback, useState } from 'react';
import { scientificStyles } from '@/src/styles/scientific';

export default function ScientificCalculatorScreen() {
  const [displayValue, setDisplayValue] = useState('0');

  const handleKeyPress = useCallback((key: string) => {
    setDisplayValue(prev => prev === '0' ? key : prev + key);
  }, []);

  const handleScientificFunction = useCallback((func: string) => {
    let result = '0';
    const currentValue = parseFloat(displayValue) || 0;
    
    switch(func) {
      case 'sin':
        result = Math.sin(currentValue * Math.PI / 180).toString();
        break;
      case 'cos':
        result = Math.cos(currentValue * Math.PI / 180).toString();
        break;
      case 'tan':
        result = Math.tan(currentValue * Math.PI / 180).toString();
        break;
      case 'log':
        result = Math.log10(currentValue).toString();
        break;
      case 'π':
        result = Math.PI.toString();
        break;
      case 'e':
        result = Math.E.toString();
        break;
      case '√':
        result = Math.sqrt(currentValue).toString();
        break;
      case '^':
        setDisplayValue(prev => prev + '**');
        return;
      case '!':
        let factorial = 1;
        for(let i = 2; i <= currentValue; i++) factorial *= i;
        result = factorial.toString();
        break;
    }
    
    setDisplayValue(result);
  }, [displayValue]);

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