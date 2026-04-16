import React, { useMemo } from 'react';
import { useSelector } from '@/store/hooks';
import { selectHistory } from '@/store/history.slice';
import { moderateScaleFactor } from '@/theme/spacing';
import { Text } from 'react-native';
import { useThemedStyles } from '@/theme';
import { createHistoryListStyles } from '@/styles/history-list';

const HistoryList = () => {
  const history = useSelector(selectHistory);
  const styles = useThemedStyles(createHistoryListStyles);
  const items = useMemo(() => history.map((item, index) => (
    <Text key={index} style={styles.item}>
      {item}
    </Text>
  )), [history, styles.item]);

  return (
    <Text style={styles.container}>
      {items}
    </Text>
  );
};

export default HistoryList;