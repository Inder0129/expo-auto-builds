import { Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { StyleSheet } from 'react-native';

type CalculatorDisplayProps = {
  value: string;
};

export function CalculatorDisplay({ value }: CalculatorDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text} numberOfLines={1}>
        {value || '0'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.lg,
    alignItems: 'flex-end',
  },
  text: {
    fontSize: 48,
    fontWeight: '600' as const,
    color: colors.text,
  },
});