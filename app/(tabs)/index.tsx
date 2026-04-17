import { View } from 'react-native';
import { CalculatorDisplay } from '../../src/components/calculator/calculator-display';
import { CalculatorKeypad } from '../../src/components/calculator/calculator-keypad';
import { WrapperView } from '../../src/components/ui/wrapper-view';
import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';

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
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});