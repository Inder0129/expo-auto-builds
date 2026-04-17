import React from 'react';
import { View } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { Container } from '@/src/components/ui/container';

type CalculatorDisplayProps = {
  value: string;
  expression?: string;
};

export const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ value, expression }) => {
  return (
    <Container variant="display">
      {expression && (
        <Text variant="displayExpression" numberOfLines={1} ellipsizeMode="head">
          {expression}
        </Text>
      )}
      <Text variant="displayValue" numberOfLines={1} ellipsizeMode="head">
        {value}
      </Text>
    </Container>
  );
};
