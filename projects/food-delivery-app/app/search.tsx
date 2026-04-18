import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/src/theme';
import { SearchInput } from '@/src/components/search/search-input';
import { SearchResults } from '@/src/components/search/search-results';
import { RecentSearches } from '@/src/components/search/recent-searches';
import { Suggestions } from '@/src/components/search/suggestions';
import { searchStyles } from '@/src/styles/search';

type SearchResultType = {
  id: string;
  name: string;
  type: 'restaurant' | 'dish';
  rating: number;
  deliveryTime: string;
  priceRange?: string;
  category?: string;
};

type RecentSearchType = {
  id: string;
  query: string;
  timestamp: number;
};

type SuggestionType = {
  id: string;
  text: string;
  type: 'category' | 'popular';
};

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  
  const recentSearches: RecentSearchType[] = useMemo(() => ([
    { id: '1', query: 'Pizza', timestamp: Date.now() - 3600000 },
    { id: '2', query: 'Sushi', timestamp: Date.now() - 7200000 },
    { id: '3', query: 'Burger', timestamp: Date.now() - 86400000 },
  ]), []);
  
  const suggestions: SuggestionType[] = useMemo(() => ([
    { id: '1', text: 'Italian', type: 'category' },
    { id: '2', text: 'Chinese', type: 'category' },
    { id: '3', text: 'Vegetarian', type: 'category' },
    { id: '4', text: 'Pizza Hut', type: 'popular' },
    { id: '5', text: 'McDonald\'s', type: 'popular' },
  ]), []);
  
  const searchResults: SearchResultType[] = useMemo(() => ([
    { id: '1', name: 'Pizza Palace', type: 'restaurant', rating: 4.5, deliveryTime: '25-35 min', priceRange: '$$' },
    { id: '2', name: 'Margherita Pizza', type: 'dish', rating: 4.7, deliveryTime: '30-40 min', category: 'Italian' },
    { id: '3', name: 'Sushi Express', type: 'restaurant', rating: 4.3, deliveryTime: '20-30 min', priceRange: '$$$' },
  ]), []);
  
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0);
  }, []);
  
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setIsSearching(false);
  }, []);
  
  const handleRecentSearchSelect = useCallback((query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
  }, []);
  
  const handleSuggestionSelect = useCallback((suggestion: SuggestionType) => {
    setSearchQuery(suggestion.text);
    setIsSearching(true);
  }, []);
  
  const handleResultSelect = useCallback((result: SearchResultType) => {
    if (result.type === 'restaurant') {
      router.push(`/restaurant/${result.id}`);
    }
  }, [router]);
  
  const handleClearRecentSearches = useCallback(() => {
    // In a real app, this would dispatch to store
    console.log('Clear recent searches');
  }, []);
  
  return (
    <SafeAreaView style={searchStyles.container} edges={['top']}>
      <View style={searchStyles.header}>
        <SearchInput 
          value={searchQuery}
          onChangeText={handleSearch}
          onClear={handleClearSearch}
          placeholder="Search restaurants or dishes..."
        />
      </View>
      
      {isSearching ? (
        <SearchResults 
          results={searchResults}
          query={searchQuery}
          onSelect={handleResultSelect}
        />
      ) : (
        <>
          <RecentSearches 
            searches={recentSearches}
            onSelect={handleRecentSearchSelect}
            onClear={handleClearRecentSearches}
          />
          <Suggestions 
            suggestions={suggestions}
            onSelect={handleSuggestionSelect}
          />
        </>
      )}
    </SafeAreaView>
  );
}
