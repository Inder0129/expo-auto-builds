import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { useThemedStyles } from '@/theme';
import createHistoryListStyles from '@/styles/history-list';

interface HistoryItem {
  id: number;
  calculation: string;
}

const HistoryList = ({ style }: { style: any }) => {
  const styles = useThemedStyles(createHistoryListStyles);
  const history = useMemo(() => [
    { id: 1, calculation: '2 + 2 = 4' },
    { id: 2, calculation: '5 * 5 = 25' },
  ], []);

  return <View style={[styles.container, style]}>
    {history.map((item) => (
      <Text key={item.id} style={styles.item}>{item.calculation}</Text>
    ))}
  </View>;
};

export default HistoryList;