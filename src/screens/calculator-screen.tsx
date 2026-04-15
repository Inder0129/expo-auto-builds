import React from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '../../theme/index';
import { moderateScale } from 'react-native-size-matters';

export const CalculatorScreen = () => {
  const { colors, typography, spacing } = useThemedStyles();
  const handleCalculate = React.useCallback(() => {
    // calculate logic
  }, []);

  return (
    <View style={{
      backgroundColor: colors.background,
      paddingHorizontal: spacing.large,
      paddingVertical: spacing.large,
    }}>
      <Text style={{
        fontSize: moderateScale(24),
        fontFamily: typography.fontFamily,
        color: colors.text,
      }}>Calculator Screen</Text>
    </View>
  );
};