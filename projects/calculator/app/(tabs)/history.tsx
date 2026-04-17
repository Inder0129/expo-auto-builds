import { FlatList, View } from 'react-native';
import { HistoryList } from '@/src/components/history/history-list';
import { ClearHistoryButton } from '@/src/components/history/clear-history-button';
import { WrapperView } from '@/src/components/ui';
import { useCallback, useState } from 'react';
import { historyStyles } from '@/src/styles/history';

export default function HistoryScreen() {
  const [history, setHistory] = useState<Array<{expression: string, result: string}>>([]);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <WrapperView>
      <View style={historyStyles.container}>
        <FlatList
          data={history}
          renderItem={({ item }) => <HistoryList item={item} />}
          keyExtractor={(item, index) => index.toString()}
          style={historyStyles.list}
        />
        <ClearHistoryButton onPress={handleClearHistory} />
      </View>
    </WrapperView>
  );
}