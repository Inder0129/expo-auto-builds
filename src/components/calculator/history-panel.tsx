import React, { useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useAppSelector } from '@/store/hooks';
import { selectRecentHistory } from '@/store/slices/history';
import { Card } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createHistoryPanelStyles } from '@/styles/components/history-panel';

export const HistoryPanel: React.FC = () => {
  const history = useAppSelector(selectRecentHistory);
  const styles = useThemedStyles(createHistoryPanelStyles);

  const recentItems = useMemo(() => {
    return history.slice(0, 3);
  }, [history]);

  const renderItem = useCallback(({ item }: { item: string }) => (
    <Card style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </Card>
  ), [styles]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent</Text>
      <FlatList
        data={recentItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        scrollEnabled={false}
      />
    </View>
  );
};
