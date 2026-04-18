import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface SearchItem {
  id: string;
  name: string;
  type: 'restaurant' | 'dish' | 'cuisine';
}

interface SearchResultsProps {
  results: SearchItem[];
  onSelectResult: (item: SearchItem) => void;
  searchQuery: string;
  style?: ViewStyle;
}

const SearchResults: React.FC<SearchResultsProps> = (props: SearchResultsProps) => {
  const { results, onSelectResult, searchQuery, style } = props;

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
      style={styles.resultItem}
      onPress={() => onSelectResult(item)}
    >
      <Ionicons 
        name={getIconName(item.type)} 
        size={20} 
        color={colors.primary} 
        style={styles.resultIcon}
      />
      <Text style={styles.resultText}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  ), [onSelectResult, getIconName]);

  if (results.length === 0 && searchQuery.trim()) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.noResultsContainer}>
          <Ionicons name="search" size={48} color={colors.textSecondary} />
          <Text style={styles.noResultsTitle}>No results found</Text>
          <Text style={styles.noResultsText}>
            Try searching for something else
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.resultsCount}>
        {results.length} result{results.length !== 1 ? 's' : ''} for "{searchQuery}"
      </Text>
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item: SearchItem) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultIcon: {
    marginRight: 12,
  },
  resultText: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default SearchResults;