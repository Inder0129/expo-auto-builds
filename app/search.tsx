import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { Button } from '@/src/components/ui/button';
import { SearchInput } from '@/src/components/search/search-input';
import { SearchSuggestion } from '@/src/components/search/search-suggestion';
import { RecentSearches } from '@/src/components/search/recent-searches';
import { SearchResults } from '@/src/components/search/search-results';
import { styles } from '@/src/styles/search';

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

const SearchScreen: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([
    { id: '1', query: 'Pizza', timestamp: Date.now() - 3600000 },
    { id: '2', query: 'Burger', timestamp: Date.now() - 7200000 },
    { id: '3', query: 'Sushi', timestamp: Date.now() - 10800000 },
  ]);

  const suggestions: SearchItem[] = useMemo(() => [
    { id: '1', name: 'Italian', type: 'cuisine' },
    { id: '2', name: 'Chinese', type: 'cuisine' },
    { id: '3', name: 'Burger King', type: 'restaurant' },
    { id: '4', name: 'Margherita Pizza', type: 'dish' },
    { id: '5', name: 'Sushi Rolls', type: 'dish' },
  ], []);

  const searchResults: SearchItem[] = useMemo(() => [
    { id: '6', name: 'Dominos Pizza', type: 'restaurant' },
    { id: '7', name: 'Pasta Carbonara', type: 'dish' },
    { id: '8', name: 'Indian', type: 'cuisine' },
  ], []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      setIsSearching(true);
      const newSearch: RecentSearch = {
        id: Date.now().toString(),
        query: query,
        timestamp: Date.now(),
      };
      setRecentSearches((prev: RecentSearch[]) => [newSearch, ...prev.slice(0, 4)]);
    } else {
      setIsSearching(false);
    }
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setIsSearching(false);
  }, []);

  const handleSuggestionPress = useCallback((item: SearchItem) => {
    if (item.type === 'restaurant') {
      router.push(`/restaurant/${item.id}`);
    } else if (item.type === 'dish') {
      router.push(`/dish/${item.id}`);
    } else {
      handleSearch(item.name);
    }
  }, [router, handleSearch]);

  const handleRecentSearchPress = useCallback((search: RecentSearch) => {
    handleSearch(search.query);
  }, [handleSearch]);

  const handleClearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);

  const handleResultPress = useCallback((item: SearchItem) => {
    if (item.type === 'restaurant') {
      router.push(`/restaurant/${item.id}`);
    } else if (item.type === 'dish') {
      router.push(`/dish/${item.id}`);
    }
  }, [router]);

  const handleBackPress = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <SearchInput
            value={searchQuery}
            onChangeText={handleSearch}
            onClear={handleClearSearch}
            placeholder="Search restaurants, dishes, cuisines..."
            autoFocus={true}
            style={styles.searchInput}
          />
        </View>

        {isSearching ? (
          <SearchResults
            results={searchResults}
            onResultPress={handleResultPress}
            style={styles.resultsContainer}
          />
        ) : (
          <View style={styles.contentContainer}>
            <RecentSearches
              searches={recentSearches}
              onSearchPress={handleRecentSearchPress}
              onClearPress={handleClearRecentSearches}
              style={styles.recentSearchesContainer}
            />
            <SearchSuggestion
              suggestions={suggestions}
              onSuggestionPress={handleSuggestionPress}
              style={styles.suggestionsContainer}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SearchScreen;