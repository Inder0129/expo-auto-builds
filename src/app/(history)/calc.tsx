import React, { useCallback, useState } from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Display } from '@/components/display/display';
import { Buttons } from '@/components/buttons/buttons';
import { createCalcStyles } from '@/styles/calc';

const CalcScreen = () => {
  const styles = useThemedStyles(createCalcStyles);
  const [result, setResult] = useState('');

  const handlePress = useCallback((value: string) => {
    setResult(result + value);
  }, [result]);

  const handleClear = useCallback(() => {
    setResult('');
  }, []);

  return (
    <View style={styles.container}>
      <Display result={result} />
      <Buttons onPress={handlePress} onClear={handleClear} />
    </View>
  );
};

export default CalcScreen;