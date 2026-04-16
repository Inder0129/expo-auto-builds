import React from 'react';
import { FlatList } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Text, Card } from '@/components/ui';
import { createHistoryListStyles } from './history-list.styles';

type HistoryListProps = {
  history: string[];
};

export const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  const styles = useThemedStyles(createHistoryListStyles);

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <Card style={styles.itemCard}>
      <Text style={styles.itemText}>{item}</Text>
    </Card>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No calculation history</Text>
    </View>
  );

  return (
    <FlatList
      data={history}
      renderItem={renderItem}
      keyExtractor={(_, index) => index.toString()}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

const View = ({ style, children }: any) => <div style={style}>{children}</div>;
