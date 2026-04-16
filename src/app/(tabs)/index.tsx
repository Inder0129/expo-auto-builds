import { View } from 'react-native';
import { CalculatorDisplay, CalculatorKeypad } from '@/components/calculator';
import { useThemedStyles } from '@/theme';
import { createCalculatorStyles } from '@/styles/screens/calculator';

export default function CalculatorScreen() {
  const styles = useThemedStyles(createCalculatorStyles);

  return (
    <View style={styles.container}>
      <CalculatorDisplay />
      <CalculatorKeypad />
    </View>
  );
}
