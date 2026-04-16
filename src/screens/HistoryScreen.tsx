import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Container } from '@/components/ui';
import { HistoryList, ClearHistoryButton } from '@/components/history';
import { useCalculator } from '@/store/hooks';
import { createHistoryStyles } from '@/styles/history';

type HistoryScreenProps = {};

export const HistoryScreen: React.FC<HistoryScreenProps> = () => {
  const styles = useThemedStyles(createHistoryStyles);
  const { history, clearHistory } = useCalculator();

  const handleClear = useCallback(() => {
    clearHistory();
  }, [clearHistory]);

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <ClearHistoryButton onPress={handleClear} disabled={history.length === 0} />
      </View>
      <View style={styles.listContainer}>
        <HistoryList history={history} />
      </View>
    </Container>
  );
};
