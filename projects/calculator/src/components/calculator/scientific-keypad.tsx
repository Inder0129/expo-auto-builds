import { View } from 'react-native';
import { Button } from '../ui/button';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { StyleSheet } from 'react-native';

type ScientificKeypadProps = {
  onKeyPress: (key: string) => void;
  onScientificFunction: (func: string) => void;
};

export function ScientificKeypad({ onKeyPress, onScientificFunction }: ScientificKeypadProps) {
  const basicKeys = [
    ['7', '8', '9', '/', 'sin'],
    ['4', '5', '6', '*', 'cos'],
    ['1', '2', '3', '-', 'tan'],
    ['0', '.', '=', '+', 'log'],
  ];

  const scientificFunctions = ['π', 'e', '√', '^', '!'];

  return (
    <View style={styles.container}>
      <View style={styles.scientificRow}>
        {scientificFunctions.map((func) => (
          <Button
            key={func}
            title={func}
            onPress={() => onScientificFunction(func)}
            style={styles.scientificButton}
          />
        ))}
      </View>
      {basicKeys.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key) => (
            <Button
              key={key}
              title={key}
              onPress={() => key === '=' ? onKeyPress(key) : onKeyPress(key)}
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
  scientificRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  scientificButton: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  keyButton: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});