import React from 'react';
import { View, Text } from 'react-native';
import { useThemeColors } from '@/src/theme';
import { typography } from '@/src/theme/typography';

type HistoryItem = {
  id: string;
  expression: string;
  result: string;
  timestamp: string;
};

type HistoryListProps = {
  history: HistoryItem[];
};

export const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  const colors = useThemeColors();

  if (history.length === 0) {
    return (
      <View style={{ alignItems: 'center', paddingVertical: 32 }}>
        <Text style={[typography.body, { color: colors.textSecondary }]}>
          No history yet
        </Text>
      </View>
    );
  }

  return (
    <View>
      {history.map((item) => (
        <View
          key={item.id}
          style={{
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}
        >
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            {item.timestamp}
          </Text>
          <Text style={[typography.body, { color: colors.textPrimary }]}>
            {item.expression} = {item.result}
          </Text>
        </View>
      ))}
    </View>
  );
};
