import React, { useMemo } from 'react';
import { FlatList, Text } from 'react-native';
import { useAppSelector } from '@/store/hooks';
import { selectFilteredHistory } from '@/store/slices/history';
import { Card } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createHistoryListStyles } from '@/styles/components/history-list';

export const HistoryList: React.FC = () => {
  const history = useAppSelector(selectFilteredHistory);
  const styles = useThemedStyles(createHistoryListStyles);

  const renderItem = useCallback(({ item }: { item: string }) => (
    <Card style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </Card>
  ), [styles]);

  const emptyComponent = useMemo(() => (
    <Text style={styles.emptyText}>No history yet</Text>
  ), [styles]);

  return (
    <FlatList
      data={history}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={emptyComponent}
      contentContainerStyle={styles.listContent}
    />
  );
};
