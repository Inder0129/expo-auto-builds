import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useThemedStyles } from '@/theme';
import { HistoryList, ClearHistoryButton } from '@/components/history';
import { WrapperView } from '@/components/ui';
import { createHistoryStyles } from '@/styles/tabs/history';

export default function HistoryScreen() {
  const styles = useThemedStyles(createHistoryStyles);

  const handleClear = useCallback(() => {
    // Handled by component
  }, []);

  return (
    <WrapperView style={styles.wrapper}>
      <View style={styles.container}>
        <ClearHistoryButton onPress={handleClear} style={styles.clearButton} />
        <HistoryList style={styles.list} />
      </View>
    </WrapperView>
  );
}
