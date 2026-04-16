import React from 'react';
import { View, ScrollView } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Text, Button } from '@/components/ui';
import { createHistoryPanelStyles } from './history-panel.styles';

type HistoryPanelProps = {
  history: string[];
  onClear: () => void;
};

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onClear }) => {
  const styles = useThemedStyles(createHistoryPanelStyles);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        {history.length > 0 && (
          <Button title="Clear" type="secondary" onPress={onClear} style={styles.clearButton} />
        )}
      </View>
      <ScrollView style={styles.list}>
        {history.length === 0 ? (
          <Text style={styles.emptyText}>No calculations yet</Text>
        ) : (
          history.map((item, index) => (
            <Text key={index} style={styles.historyItem}>
              {item}
            </Text>
          ))
        )}
      </ScrollView>
    </View>
  );
};
