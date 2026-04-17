import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useThemeColors } from '@/src/theme';
import { typography } from '@/src/theme/typography';

type DecimalPrecisionSelectorProps = {
  value: number;
  onChange: (value: number) => void;
};

export const DecimalPrecisionSelector: React.FC<DecimalPrecisionSelectorProps> = ({ value, onChange }) => {
  const colors = useThemeColors();

  const options = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <View>
      <Text style={[typography.body, { color: colors.textPrimary, marginBottom: 8 }]}>
        Decimal Precision
      </Text>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={{ color: colors.textPrimary }}
      >
        {options.map((option) => (
          <Picker.Item key={option} label={`${option} decimal places`} value={option} />
        ))}
      </Picker>
    </View>
  );
};
