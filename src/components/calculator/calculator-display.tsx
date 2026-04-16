import { View, Text } from 'react-native';
import { useCallback } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectDisplayValue } from '@/store/slices/calculator';
import { useThemedStyles } from '@/theme';
import { createCalculatorDisplayStyles } from '@/styles/components/calculator-display';

type CalculatorDisplayProps = {
  onClear?: () => void;
};

export function CalculatorDisplay({ onClear }: CalculatorDisplayProps) {
  const displayValue = useAppSelector(selectDisplayValue);
  const styles = useThemedStyles(createCalculatorDisplayStyles);

  const handleClearPress = useCallback(() => {
    onClear?.();
  }, [onClear]);

  return (
    <View style={styles.container}>
      <Text style={styles.value} numberOfLines={1}>
        {displayValue}
      </Text>
    </View>
  );
}
