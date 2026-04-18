import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { SearchInput } from '@/src/components/search/search-input';
import { SearchSuggestion } from '@/src/components/search/search-suggestion';
import { RecentSearches } from '@/src/components/search/recent-searches';
import { FilterButton } from '@/src/components/search/filter-button';
import { searchStyles } from '@/src/styles/search';

interface SearchItem {
  id: string;
  name: string;
  type: 'restaurant' | 'dish' | 'cuisine';
}

interface RecentSearch {
  id: string;
  query: string;
  timestamp: number;
}

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([
    { id: '1', query: 'Pizza', timestamp: Date.now() - 3600000 },
    { id: '2', query: 'Sushi', timestamp: Date.now() - 7200000 },
    { id: '3', query: 'Burger', timestamp: Date.now() - 86400000 },
  ]);

  const suggestions: SearchItem[] = useMemo(() => [
    { id: '1', name: 'Italian Pizza', type: 'dish' },
    { id: '2', name: 'Sushi House', type: 'restaurant' },
    { id: '3', name: 'Mexican Tacos', type: 'dish' },
    { id: '4', name: 'Chinese', type: 'cuisine' },
    { id: '5', name: 'Burger King', type: 'restaurant' },
  ], []);

  const handleSearch = useCallback((searchQuery: string) => {
    if (searchQuery.trim()) {
      setRecentSearches(prev => [
        { id: Date.now().toString(), query: searchQuery, timestamp: Date.now() },
        ...prev.filter(item => item.query !== searchQuery).slice(0, 9),
      ]);
      router.push(`/(modals)/search?query=${encodeURIComponent(searchQuery)}`);
    }
  }, [router]);

  const handleClearRecent = useCallback(() => {
    setRecentSearches([]);
  }, []);

  const handleFilterPress = useCallback(() => {
    router.push('/(modals)/search?filter=true');
  }, [router]);

  const renderSuggestion = useCallback(({ item }: { item: SearchItem }) => (
    <SearchSuggestion
      item={item}
      onPress={() => handleSearch(item.name)}
    />
  ), [handleSearch]);

  return (
    <View style={searchStyles.container}>
      <Stack.Screen
        options={{
          headerTitle: 'Search',
          headerRight: () => (
            <FilterButton onPress={handleFilterPress} />
          ),
        }}
      />
      <SearchInput
        value={query}
        onChangeText={setQuery}
        onSubmit={() => handleSearch(query)}
        placeholder="Search for restaurants or dishes"
      />
      <RecentSearches
        searches={recentSearches}
        onSearch={handleSearch}
        onClear={handleClearRecent}
      />
      <Text style={searchStyles.suggestionsTitle}>Popular Searches</Text>
      <FlatList
        data={suggestions}
        renderItem={renderSuggestion}
        keyExtractor={(item: SearchItem) => item.id}
        contentContainerStyle={searchStyles.suggestionsList}
      />
    </View>
  );
}
