import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useThemeColors } from '@/src/theme';
import { typography } from '@/src/theme/typography';

type HistoryItem = {
  id: string;
  expression: string;
  result: string;
};

type HistoryPanelProps = {
  history: HistoryItem[];
};

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history }) => {
  const colors = useThemeColors();

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <View style={{ paddingVertical: 4 }}>
      <Text style={[typography.caption, { color: colors.textSecondary }]}>
        {item.expression} =
      </Text>
      <Text style={[typography.body, { color: colors.textPrimary }]}>
        {item.result}
      </Text>
    </View>
  );

  return (
    <View>
      <Text style={[typography.subtitle, { color: colors.textPrimary, marginBottom: 8 }]}>
        Recent History
      </Text>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};
