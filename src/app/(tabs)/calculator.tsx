import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '@/theme';
import { CalculatorDisplay, CalculatorKeypad, HistoryPanel } from '@/components/calculator';
import { WrapperView } from '@/components/ui';
import { useAppSelector } from '@/store/hooks';
import { createCalculatorStyles } from '@/styles/tabs/calculator';

export default function CalculatorScreen() {
  const styles = useThemedStyles(createCalculatorStyles);
  const { currentValue, expression } = useAppSelector((state) => state.calculator);
  const { showHistory } = useAppSelector((state) => state.settings);

  const displayValue = useMemo(() => currentValue || expression || '0', [currentValue, expression]);

  const handleKeyPress = useCallback((key: string) => {
    // Handled by store
  }, []);

  return (
    <WrapperView style={styles.wrapper}>
      <View style={styles.container}>
        <CalculatorDisplay value={displayValue} style={styles.display} />
        <CalculatorKeypad onKeyPress={handleKeyPress} style={styles.keypad} />
        {showHistory && <HistoryPanel style={styles.history} />}
      </View>
    </WrapperView>
  );
}
