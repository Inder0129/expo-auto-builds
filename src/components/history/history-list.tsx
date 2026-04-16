import React, { useMemo } from 'react';
import { FlatList, Text, ViewStyle } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Card } from '@/components/ui';
import { useAppSelector } from '@/store/hooks';
import { createHistoryListStyles } from './history-list.styles';

type HistoryListProps = {
  style?: ViewStyle;
};

export function HistoryList({ style }: HistoryListProps) {
  const styles = useThemedStyles(createHistoryListStyles);
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
    <FlatList
      data={reversedItems}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      style={[styles.container, style]}
      ListEmptyComponent={<Text style={styles.empty}>No history yet</Text>}
    />
  );
}
