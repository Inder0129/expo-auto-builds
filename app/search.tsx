import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '@/src/components/search/search-bar';
import { colors } from '@/src/theme';
import searchStyles from '@/src/styles/search';

interface SearchSuggestion {
  id: string;
  title: string;
  type: 'restaurant' | 'dish' | 'category';
}

const SearchScreen: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Pizza',
    'Burger',
    'Sushi',
    'Chinese',
    'Coffee'
  ]);

  const suggestions: SearchSuggestion[] = useMemo(() => [
    { id: '1', title: 'Dominos Pizza', type: 'restaurant' },
    { id: '2', title: 'Margherita Pizza', type: 'dish' },
    { id: '3', title: 'Italian Food', type: 'category' },
    { id: '4', title: 'McDonalds', type: 'restaurant' },
    { id: '5', title: 'Chicken Burger', type: 'dish' },
    { id: '6', title: 'Fast Food', type: 'category' }
  ], []);

  const handleSearch = useCallback((text: string) => {
    setQuery(text);
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
  }, []);

  const handleSuggestionPress = useCallback((suggestion: SearchSuggestion) => {
    if (suggestion.type === 'restaurant') {
      router.push(`/restaurant/${suggestion.id}`);
    }
  }, [router]);

  const handleRecentSearchPress = useCallback((search: string) => {
    setQuery(search);
  }, []);

  const handleClearRecent = useCallback(() => {
    setRecentSearches([]);
  }, []);

  const filteredSuggestions = useMemo(() => {
    if (!query.trim()) return [];
    return suggestions.filter((item: SearchSuggestion) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, suggestions]);

  const renderSuggestionItem = useCallback(({ item }: { item: SearchSuggestion }) => (
    <TouchableOpacity
      style={searchStyles.suggestionItem}
      onPress={() => handleSuggestionPress(item)}
    >
      <Ionicons
        name={item.type === 'restaurant' ? 'restaurant' : item.type === 'dish' ? 'fast-food' : 'pizza'}
        size={20}
        color={colors.textSecondary}
      />
      <Text style={searchStyles.suggestionText}>{item.title}</Text>
    </TouchableOpacity>
  ), [handleSuggestionPress]);

  const renderRecentSearchItem = useCallback(({ item }: { item: string }) => (
    <TouchableOpacity
      style={searchStyles.recentItem}
      onPress={() => handleRecentSearchPress(item)}
    >
      <Ionicons name="time-outline" size={18} color={colors.textSecondary} />
      <Text style={searchStyles.recentText}>{item}</Text>
    </TouchableOpacity>
  ), [handleRecentSearchPress]);

  return (
    <SafeAreaView style={searchStyles.container} edges={['top']}>
      <View style={searchStyles.header}>
        <SearchBar
          value={query}
          onChangeText={handleSearch}
          onClear={handleClear}
          autoFocus={true}
          placeholder="Search for restaurants or dishes"
        />
      </View>

      {query ? (
        <FlatList
          data={filteredSuggestions}
          renderItem={renderSuggestionItem}
          keyExtractor={(item: SearchSuggestion) => item.id}
          contentContainerStyle={searchStyles.suggestionsList}
          keyboardShouldPersistTaps="handled"
        />
      ) : (
        <View style={searchStyles.recentContainer}>
          <View style={searchStyles.recentHeader}>
            <Text style={searchStyles.recentTitle}>Recent Searches</Text>
            {recentSearches.length > 0 && (
              <TouchableOpacity onPress={handleClearRecent}>
                <Text style={searchStyles.clearText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>
          <FlatList
            data={recentSearches}
            renderItem={renderRecentSearchItem}
            keyExtractor={(item: string, index: number) => `${item}-${index}`}
            contentContainerStyle={searchStyles.recentList}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;