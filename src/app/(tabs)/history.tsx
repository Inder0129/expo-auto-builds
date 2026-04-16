import { FlatList, View, Text } from 'react-native';
import { useAppSelector } from '@/store/hooks';
import { selectHistory } from '@/store/slices/history';
import { Card } from '@/components/ui';
import { useThemedStyles } from '@/theme';
import { createHistoryStyles } from '@/styles/screens/history';

export default function HistoryScreen() {
  const history = useAppSelector(selectHistory);
  const styles = useThemedStyles(createHistoryStyles);

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Text style={styles.expression}>{item.expression}</Text>
            <Text style={styles.result}>{item.result}</Text>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
