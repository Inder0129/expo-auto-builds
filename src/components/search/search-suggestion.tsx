import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface SearchItem {
  id: string;
  name: string;
  type: 'restaurant' | 'dish' | 'cuisine';
}

interface SearchSuggestionProps {
  suggestions: SearchItem[];
  onSelectSuggestion: (item: SearchItem) => void;
  style?: ViewStyle;
}

const SearchSuggestion: React.FC<SearchSuggestionProps> = (props: SearchSuggestionProps) => {
  const { suggestions, onSelectSuggestion, style } = props;

  const getIconName = useCallback((type: string): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case 'restaurant': return 'restaurant';
      case 'dish': return 'fast-food';
      case 'cuisine': return 'flag';
      default: return 'search';
    }
  }, []);

  const renderItem = useCallback(({ item }: { item: SearchItem }) => (
    <TouchableOpacity 
      style={styles.suggestionItem}
      onPress={() => onSelectSuggestion(item)}
    >
      <Ionicons 
        name={getIconName(item.type)} 
        size={20} 
        color={colors.primary} 
        style={styles.suggestionIcon}
      />
      <Text style={styles.suggestionText}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  ), [onSelectSuggestion, getIconName]);

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Popular Searches</Text>
      <FlatList
        data={suggestions}
        renderItem={renderItem}
        keyExtractor={(item: SearchItem) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  suggestionIcon: {
    marginRight: 12,
  },
  suggestionText: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
});

export default SearchSuggestion;