import { FlatList, View } from 'react-native';
import { HistoryList } from '../../src/components/history/history-list';
import { ClearHistoryButton } from '../../src/components/history/clear-history-button';
import { WrapperView } from '../../src/components/ui/wrapper-view';
import { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';

export default function HistoryScreen() {
  const [history, setHistory] = useState<Array<{expression: string, result: string}>>([]);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <WrapperView>
      <View style={styles.container}>
        <FlatList
          data={history}
          renderItem={({ item }) => <HistoryList item={item} />}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />
        <ClearHistoryButton onPress={handleClearHistory} />
      </View>
    </WrapperView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});