import React from 'react';
import { useThemedStyles } from '@/theme';
import HistoryList from '@/components/history/history-list';
import { View } from 'react-native';
import { createHistoryStyles } from '@/styles/history';

const HistoryScreen = () => {
  const styles = useThemedStyles(createHistoryStyles);
  return (
    <View style={styles.container}>
      <HistoryList />
    </View>
  );
};

export default HistoryScreen;