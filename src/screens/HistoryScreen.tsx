import React, { useCallback } from 'react';
import { View } from 'react-native';
import { HistoryList } from '@/components/history/history-list';
import { ClearHistoryButton } from '@/components/history/clear-history-button';
import { Container } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createHistoryStyles } from '@/styles/history';

type HistoryScreenProps = {};

export const HistoryScreen: React.FC<HistoryScreenProps> = () => {
  const styles = useThemedStyles(createHistoryStyles);

  const handleClearHistory = useCallback(() => {
    // Clear history handler
  }, []);

  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <ClearHistoryButton onPress={handleClearHistory} />
      </View>
      <View style={styles.listContainer}>
        <HistoryList />
      </View>
    </Container>
  );
};
