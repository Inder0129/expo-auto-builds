import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useThemeColors } from '@/src/theme';
import { Text } from '@/src/components/ui';
import { createDecimalPrecisionSelectorStyles } from '@/src/components/settings/decimal-precision-selector.styles';

type DecimalPrecisionSelectorProps = {
  currentPrecision: number;
  onPrecisionChange: (precision: number) => void;
};

export const DecimalPrecisionSelector: React.FC<DecimalPrecisionSelectorProps> = ({ currentPrecision, onPrecisionChange }) => {
  const colors = useThemeColors();
  const styles = createDecimalPrecisionSelectorStyles(colors);

  const precisionOptions = [0, 2, 4, 6, 8];

  const handlePrecisionPress = useCallback((precision: number) => {
    onPrecisionChange(precision);
  }, [onPrecisionChange]);

  return (
    <View style={styles.container}>
      {precisionOptions.map((precision) => (
        <TouchableOpacity
          key={precision}
          style={[
            styles.precisionOption,
            currentPrecision === precision && styles.precisionOptionActive,
          ]}
          onPress={() => handlePrecisionPress(precision)}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.precisionLabel,
            currentPrecision === precision && styles.precisionLabelActive,
          ]}>
            {precision === 0 ? 'None' : precision.toString()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
