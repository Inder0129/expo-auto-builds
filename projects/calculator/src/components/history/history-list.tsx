import { Text, View } from 'react-native';
import { typography } from '../../theme/typography';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { StyleSheet } from 'react-native';

type CalculationHistory = {
  expression: string;
  result: string;
};

type HistoryListProps = {
  item: CalculationHistory;
};

export function HistoryList({ item }: HistoryListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.expression}>{item.expression}</Text>
      <Text style={styles.result}>= {item.result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  expression: {
    ...typography.body,
    color: colors.text,
  },
  result: {
    ...typography.bodyBold,
    color: colors.primary,
    marginTop: spacing.xs,
  },
});