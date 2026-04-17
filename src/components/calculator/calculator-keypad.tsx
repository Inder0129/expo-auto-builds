import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useThemeColors } from '@/src/theme';
import { typography } from '@/src/theme/typography';
import { spacing } from '@/src/theme/spacing';

type CalculatorKeypadProps = {
  onKeyPress: (key: string) => void;
};

export const CalculatorKeypad: React.FC<CalculatorKeypadProps> = ({ onKeyPress }) => {
  const colors = useThemeColors();

  const keys = [
    ['C', '(', ')', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  const handlePress = useCallback((key: string) => {
    onKeyPress(key);
  }, [onKeyPress]);

  return (
    <View style={{ flex: 1 }}>
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flex: 1, flexDirection: 'row', marginBottom: spacing.sm }}>
          {row.map((key) => (
            <TouchableOpacity
              key={key}
              style={{
                flex: 1,
                backgroundColor: colors.surface,
                marginHorizontal: spacing.xs,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => handlePress(key)}
            >
              <Text style={[typography.button, { color: colors.textPrimary }]}>
                {key}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};
