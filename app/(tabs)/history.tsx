import React, { useCallback } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from '@/src/store/hooks';
import { clearHistory } from '@/src/store/slices/history';
import { HistoryList } from '@/src/components/history/history-list';
import { ClearHistoryButton } from '@/src/components/history/clear-history-button';
import { WrapperView } from '@/src/components/ui';
import { createHistoryStyles } from '@/src/styles/history';
import { useThemeColors } from '@/src/theme';

export default function HistoryScreen() {
  const colors = useThemeColors();
  const styles = createHistoryStyles(colors);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.history);

  const handleClearHistory = useCallback(() => {
    dispatch(clearHistory());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <WrapperView>
        <View style={styles.header}>
          <ClearHistoryButton onPress={handleClearHistory} />
        </View>
        <ScrollView style={styles.listContainer}>
          <HistoryList history={items} />
        </ScrollView>
      </WrapperView>
    </SafeAreaView>
  );
}
