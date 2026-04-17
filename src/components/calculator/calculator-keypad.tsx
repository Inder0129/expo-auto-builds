import { View } from 'react-native';
import { Button } from '../ui/button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { StyleSheet } from 'react-native';

type CalculatorKeypadProps = {
  onKeyPress: (key: string) => void;
  onClear: () => void;
  onEquals: () => void;
};

export function CalculatorKeypad({ onKeyPress, onClear, onEquals }: CalculatorKeypadProps) {
  const keys = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button title="C" onPress={onClear} style={styles.clearButton} />
      </View>
      {keys.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <Button
              key={key}
              title={key}
              onPress={() => key === '=' ? onEquals() : onKeyPress(key)}
              style={styles.keyButton}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  clearButton: {
    flex: 1,
    backgroundColor: colors.error,
  },
  keyButton: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});