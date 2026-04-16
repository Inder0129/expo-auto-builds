import React from 'react';
import { useThemedStyles } from '@/theme';
import HistoryList from '@/components/history/history-list';

const HistoryScreen = () => {
  const styles = useThemedStyles(createHistoryStyles);
  return <HistoryList style={styles.container} />;
};

export default HistoryScreen;