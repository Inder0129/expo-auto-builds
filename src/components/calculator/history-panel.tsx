import React, { useMemo } from 'react';
import { FlatList, Text, View, ViewStyle } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Card } from '@/components/ui';
import { useAppSelector } from '@/store/hooks';
import { createHistoryPanelStyles } from './history-panel.styles';

type HistoryPanelProps = {
  style?: ViewStyle;
};

export function HistoryPanel({ style }: HistoryPanelProps) {
  const styles = useThemedStyles(createHistoryPanelStyles);
  const { items } = useAppSelector((state) => state.history);

  const reversedItems = useMemo(() => [...items].reverse(), [items]);

  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <Card style={styles.item}>
        <Text style={styles.itemText}>{item}</Text>
      </Card>
    ),
    [styles]
  );

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>History</Text>
      <FlatList
        data={reversedItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </View>
  );
}
