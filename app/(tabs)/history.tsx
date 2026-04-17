import React, { useCallback, useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HistoryList } from '@/src/components/history/history-list';
import { ClearHistoryButton } from '@/src/components/history/clear-history-button';
import { useAppSelector, useAppDispatch } from '@/src/store/hooks';
import { clearHistory } from '@/src/store/slices/history';
import { createHistoryStyles } from '@/src/styles/history';
import { useTheme } from '@/src/theme';

export default function HistoryScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createHistoryStyles(theme.colors), [theme.colors]);
  
  const dispatch = useAppDispatch();
  const history = useAppSelector(state => state.history.items);
  
  const handleClearHistory = useCallback(() => {
    dispatch(clearHistory());
  }, [dispatch]);
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.headerContainer}>
        <ClearHistoryButton onPress={handleClearHistory} disabled={history.length === 0} />
      </View>
      <View style={styles.listContainer}>
        <HistoryList items={history} />
      </View>
    </SafeAreaView>
  );
}
