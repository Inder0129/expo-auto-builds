import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '@/theme';
import CalculatorDisplay from '@/components/calculator/calculator-display';
import ButtonGrid from '@/components/calculator/button-grid';
import createHomeStyles from '@/styles/home';

const HomeScreen = () => {
  const styles = useThemedStyles(createHomeStyles);
  const handlePress = useCallback((value: string) => {
    console.log(value);
  }, []);

  return (
    <View style={styles.container}>
      <CalculatorDisplay />
      <ButtonGrid onPress={handlePress} />
    </View>
  );
};

export default HomeScreen;