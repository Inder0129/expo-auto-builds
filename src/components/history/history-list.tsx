import React from 'react';
import { FlatList } from 'react-native';
import { HistoryItem } from '@/src/components/history/history-item';
import { Text } from '@/src/components/ui/text';
import { Container } from '@/src/components/ui/container';

type HistoryItemType = {
  id: string;
  expression: string;
  result: string;
  timestamp: string;
};

type HistoryListProps = {
  items: HistoryItemType[];
};

export const HistoryList: React.FC<HistoryListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <Container variant="centered">
        <Text variant="body">No calculation history</Text>
      </Container>
    );
  }
  
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <HistoryItem
          expression={item.expression}
          result={item.result}
          timestamp={item.timestamp}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};
