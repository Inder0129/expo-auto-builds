import React from 'react';
import { View, Text } from 'react-native';
import { useThemeColors } from '@/src/theme';
import { typography } from '@/src/theme/typography';

type CalculatorDisplayProps = {
  value: string;
  expression: string;
};

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ value, expression }) => {
  const colors = useThemeColors();

  return (
    <View>
      <Text style={[typography.body, { color: colors.textSecondary }]}>
        {expression}
      </Text>
      <Text style={[typography.display, { color: colors.textPrimary }]}>
        {value}
      </Text>
    </View>
  );
};
