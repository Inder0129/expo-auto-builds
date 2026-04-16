import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useThemedStyles } from '@/theme';
import { Card } from '@/components/ui';
import createContentGridStyles from './content-grid-styles';

type ContentItem = {
  id: string;
  title: string;
  description: string;
};

type Props = {
  items: ContentItem[];
  onItemPress: (itemId: string) => void;
};

const ContentGrid: React.FC<Props> = ({ items, onItemPress }) => {
  const styles = useThemedStyles(createContentGridStyles);
  
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => onItemPress(item.id)}
        >
          <Card style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ContentGrid;