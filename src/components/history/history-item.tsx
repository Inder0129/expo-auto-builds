import React from 'react';
import { View } from 'react-native';
import { Text } from '@/src/components/ui/text';
import { Container } from '@/src/components/ui/container';

type HistoryItemProps = {
  expression: string;
  result: string;
  timestamp: string;
};

export const HistoryItem: React.FC<HistoryItemProps> = ({ expression, result, timestamp }) => {
  const formattedTime = new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  return (
    <Container variant="card">
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text variant="caption">{formattedTime}</Text>
      </View>
      <Text variant="body" style={{ marginTop: 4 }}>{expression}</Text>
      <Text variant="heading" style={{ marginTop: 8 }}>= {result}</Text>
    </Container>
  );
};
