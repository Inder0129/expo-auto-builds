import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createCalculatorStyles } from '@/styles/calculator';

type CalculatorDisplayProps = {};

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = () => {
  const styles = useThemedStyles(createCalculatorStyles);
  
  const displayValue = useMemo(() => '0', []);
  const expression = useMemo(() => '', []);

  return (
    <View style={styles.displayContainer}>
      <Text type="h2" align="right">{expression}</Text>
      <Text type="h1" align="right">{displayValue}</Text>
    </View>
  );
};
