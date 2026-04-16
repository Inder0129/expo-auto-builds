import React, { useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { Text, Button } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createCalculatorStyles } from '@/styles/calculator';

type HistoryPanelProps = {
  onClearHistory: () => void;
};

type HistoryItem = {
  id: string;
  expression: string;
  result: string;
};

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ onClearHistory }) => {
  const styles = useThemedStyles(createCalculatorStyles);

  const historyItems = useMemo<HistoryItem[]>(() => [], []);

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <View style={styles.historyItem}>
      <Text type="body">{item.expression}</Text>
      <Text type="body">{item.result}</Text>
    </View>
  );

  return (
    <View style={styles.historyContainer}>
      <View style={styles.historyHeader}>
        <Text type="h3">History</Text>
        <Button title="Clear" onPress={onClearHistory} size="small" />
      </View>
      <FlatList
        data={historyItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
