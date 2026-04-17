import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface SearchSuggestion {
  id: string;
  name: string;
  type: 'restaurant' | 'dish' | 'cuisine';
}

interface SuggestionListProps {
  suggestions: SearchSuggestion[];
  onSuggestionPress: (suggestion: SearchSuggestion) => void;
}

const SuggestionList: React.FC<SuggestionListProps> = (props: SuggestionListProps) => {
  const { suggestions, onSuggestionPress } = props;

  const getIconName = (type: string): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case 'restaurant': return 'restaurant';
      case 'dish': return 'fast-food';
      case 'cuisine': return 'flag';
      default: return 'search';
    }
  };

  const renderItem = ({ item }: { item: SearchSuggestion }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onSuggestionPress(item)}
    >
      <Ionicons
        name={getIconName(item.type)}
        size={20}
        color={colors.textSecondary}
        style={styles.itemIcon}
      />
      <Text style={styles.itemText}>{item.name}</Text>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.textSecondary}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggestions</Text>
      <FlatList
        data={suggestions}
        renderItem={renderItem}
        keyExtractor={(item: SearchSuggestion) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
});

export default SuggestionList;