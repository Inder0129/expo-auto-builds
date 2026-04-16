import React from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Text } from '@/components/ui';
import { createCalculatorDisplayStyles } from './calculator-display.styles';

type CalculatorDisplayProps = {
  value: string;
};

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ value }) => {
  const styles = useThemedStyles(createCalculatorDisplayStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>
        {value || '0'}
      </Text>
    </View>
  );
};
