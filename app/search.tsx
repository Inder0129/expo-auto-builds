import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { RestaurantCard } from '@/src/components/restaurant-card/restaurant-card';
import { SearchBar } from '@/src/components/search/search-bar';
import { SearchResultItem } from '@/src/components/search/search-result-item';
import { RecentSearches } from '@/src/components/search/recent-searches';
import { styles } from '@/src/styles/search';

interface SearchResult {
  id: string;
  name: string;
  type: 'restaurant' | 'dish';
  rating: number;
  deliveryTime: string;
  priceRange?: string;
  cuisine?: string;
}

interface RecentSearch {
  id: string;
  query: string;
  timestamp: number;
}

export default function SearchScreen() {
  const params = useLocalSearchParams<{ initialQuery?: string }>();
  const [searchQuery, setSearchQuery] = useState<string>(params.initialQuery || '');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([
    { id: '1', query: 'Pizza', timestamp: Date.now() - 3600000 },
    { id: '2', query: 'Sushi', timestamp: Date.now() - 7200000 },
    { id: '3', query: 'Burger', timestamp: Date.now() - 10800000 },
  ]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    // Mock search results
    const mockResults: SearchResult[] = [
      { id: '1', name: 'Pizza Palace', type: 'restaurant', rating: 4.5, deliveryTime: '25-35 min', cuisine: 'Italian' },
      { id: '2', name: 'Sushi Express', type: 'restaurant', rating: 4.2, deliveryTime: '30-40 min', cuisine: 'Japanese' },
      { id: '3', name: 'Margherita Pizza', type: 'dish', rating: 4.7, deliveryTime: '20-30 min', priceRange: '₹300-₹500' },
    ];
    setSearchResults(mockResults);
    if (query.trim()) {
      const newRecent: RecentSearch = { id: Date.now().toString(), query, timestamp: Date.now() };
      setRecentSearches(prev => [newRecent, ...prev.filter(item => item.query !== query)].slice(0, 5));
    }
  }, []);

  const handleClearRecent = useCallback((id: string) => {
    setRecentSearches(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleClearAllRecent = useCallback(() => {
    setRecentSearches([]);
  }, []);

  const renderSearchResult = useCallback(({ item }: { item: SearchResult }) => (
    <SearchResultItem item={item} onPress={() => {}} />
  ), []);

  const showRecentSearches = useMemo(() => searchQuery === '' && recentSearches.length > 0, [searchQuery, recentSearches]);
  const showSearchResults = useMemo(() => searchQuery !== '' && searchResults.length > 0, [searchQuery, searchResults]);
  const showEmptyState = useMemo(() => searchQuery !== '' && searchResults.length === 0, [searchQuery, searchResults]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Search' }} />
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search restaurants or dishes..."
        style={styles.searchBar}
      />
      {showRecentSearches && (
        <RecentSearches
          searches={recentSearches}
          onSearchSelect={handleSearch}
          onClearItem={handleClearRecent}
          onClearAll={handleClearAllRecent}
        />
      )}
      {showSearchResults && (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item: SearchResult) => item.id}
          contentContainerStyle={styles.resultsList}
        />
      )}
      {showEmptyState && (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={64} color={colors.gray400} />
          <Text style={styles.emptyText}>No results found for "{searchQuery}"</Text>
        </View>
      )}
    </View>
  );
}
