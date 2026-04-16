import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import { Text } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createHistoryStyles } from '@/styles/history';

type HistoryListProps = {};

type HistoryItem = {
  id: string;
  expression: string;
  result: string;
};

export const HistoryList: React.FC<HistoryListProps> = () => {
  const styles = useThemedStyles(createHistoryStyles);

  const historyItems = useMemo<HistoryItem[]>(() => [], []);

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <Text type="body">{item.expression} = {item.result}</Text>
  );

  return (
    <FlatList
      data={historyItems}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};
