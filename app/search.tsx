import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SearchInput from '@/src/components/search/search-input';
import SearchSuggestions from '@/src/components/search/search-suggestions';
import RecentSearches from '@/src/components/search/recent-searches';
import SearchResults from '@/src/components/search/search-results';
import { colors } from '@/src/theme';
import styles from '@/src/styles/search';

interface SearchResult {
  id: string;
  name: string;
  type: 'restaurant' | 'dish';
  rating: number;
  deliveryTime: string;
}

interface RecentSearch {
  id: string;
  query: string;
  timestamp: string;
}

const SearchScreen: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  
  const recentSearches: RecentSearch[] = useMemo(() => [
    { id: '1', query: 'Pizza', timestamp: '2 hours ago' },
    { id: '2', query: 'Burger', timestamp: '1 day ago' },
    { id: '3', query: 'Sushi', timestamp: '3 days ago' },
  ], []);
  
  const searchResults: SearchResult[] = useMemo(() => [
    { id: '1', name: 'Pizza Palace', type: 'restaurant', rating: 4.5, deliveryTime: '30-40 min' },
    { id: '2', name: 'Burger King', type: 'restaurant', rating: 4.2, deliveryTime: '25-35 min' },
    { id: '3', name: 'Margherita Pizza', type: 'dish', rating: 4.7, deliveryTime: '30-40 min' },
  ], []);
  
  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    setIsSearching(searchQuery.length > 0);
  }, []);
  
  const handleClearSearch = useCallback(() => {
    setQuery('');
    setIsSearching(false);
  }, []);
  
  const handleResultPress = useCallback((result: SearchResult) => {
    if (result.type === 'restaurant') {
      router.push(`/restaurant/${result.id}`);
    } else {
      router.push(`/food/${result.id}`);
    }
  }, [router]);
  
  const handleRecentSearchPress = useCallback((search: RecentSearch) => {
    setQuery(search.query);
    setIsSearching(true);
  }, []);
  
  const handleClearRecentSearches = useCallback(() => {
    // Implementation for clearing recent searches
  }, []);
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <SearchInput
          value={query}
          onChangeText={handleSearch}
          onClear={handleClearSearch}
          placeholder="Search restaurants or dishes..."
          autoFocus={true}
        />
      </View>
      
      <ScrollView style={styles.content}>
        {isSearching ? (
          <>
            <SearchSuggestions query={query} />
            <SearchResults
              results={searchResults}
              onResultPress={handleResultPress}
            />
          </>
        ) : (
          <RecentSearches
            searches={recentSearches}
            onSearchPress={handleRecentSearchPress}
            onClearPress={handleClearRecentSearches}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;