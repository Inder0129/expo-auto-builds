import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '@/theme';
import CalculatorDisplay from '@/components/calculator/calculator-display';
import ButtonRow from '@/components/calculator/button-row';
import createHomeStyles from '@/styles/home';

const HomeScreen = () => {
  const styles = useThemedStyles(createHomeStyles);
  const [result, setResult] = useState('');
  const [currentNumber, setCurrentNumber] = useState('');

  const handleNumberPress = useCallback((number: string) => {
    setCurrentNumber(currentNumber + number);
  }, [currentNumber]);

  const handleOperationPress = useCallback((operation: string) => {
    setResult(currentNumber + ' ' + operation);
    setCurrentNumber('');
  }, [currentNumber]);

  const handleEqualsPress = useCallback(() => {
    try {
      const calculation = eval(result + currentNumber);
      setResult(calculation.toString());
      setCurrentNumber('');
    } catch (error) {
      setResult('Error');
    }
  }, [result, currentNumber]);

  return (
    <View style={styles.container}>
      <CalculatorDisplay result={result} currentNumber={currentNumber} />
      <ButtonRow onPress={handleNumberPress} />
      <ButtonRow onPress={handleOperationPress} operation={true} />
      <ButtonRow onPress={handleEqualsPress} equals={true} />
    </View>
  );
};

export default HomeScreen;