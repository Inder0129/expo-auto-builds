import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SearchInput from '@/src/components/search/search-input';
import SearchSuggestion from '@/src/components/search/search-suggestion';
import RecentSearches from '@/src/components/search/recent-searches';
import SearchResults from '@/src/components/search/search-results';
import { colors } from '@/src/theme';
import { Button } from '@/src/components/ui';
import { useAppSelector } from '@/src/store/hooks';
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
    { id: '3', name: 'Pizza Hut', type: 'restaurant' },
    { id: '4', name: 'Burger King', type: 'restaurant' },
    { id: '5', name: 'Margherita Pizza', type: 'dish' },
    { id: '6', name: 'Sushi Rolls', type: 'dish' },
  ], []);

  const searchResults: SearchItem[] = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return suggestions.filter((item: SearchItem) => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, suggestions]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      const newSearch: RecentSearch = {
        id: Date.now().toString(),
        query,
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

  const handleSelectSuggestion = useCallback((item: SearchItem) => {
    if (item.type === 'restaurant') {
      router.push(`/restaurant/${item.id}`);
    } else if (item.type === 'dish') {
      router.push(`/menu-item/${item.id}`);
    } else {
      router.push(`/search?cuisine=${encodeURIComponent(item.name)}`);
    }
  }, [router]);

  const handleRemoveRecentSearch = useCallback((id: string) => {
    setRecentSearches((prev: RecentSearch[]) => prev.filter((search: RecentSearch) => search.id !== id));
  }, []);

  const handleClearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);

  return (
    <SafeAreaView style={searchStyles.container}>
      <KeyboardAvoidingView 
        style={searchStyles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={searchStyles.header}>
          <SearchInput
            value={searchQuery}
            onChangeText={handleSearch}
            onClear={handleClearSearch}
            placeholder="Search for restaurants or dishes"
            autoFocus={true}
          />
          <Button
            title="Cancel"
            onPress={() => router.back()}
            variant="text"
            style={searchStyles.cancelButton}
          />
        </View>

        {isSearching ? (
          <SearchResults
            results={searchResults}
            onSelectResult={handleSelectSuggestion}
            searchQuery={searchQuery}
          />
        ) : (
          <>
            {recentSearches.length > 0 && (
              <RecentSearches
                searches={recentSearches}
                onSelectSearch={(query: string) => handleSearch(query)}
                onRemoveSearch={handleRemoveRecentSearch}
                onClearAll={handleClearRecentSearches}
              />
            )}
            <SearchSuggestion
              suggestions={suggestions}
              onSelectSuggestion={handleSelectSuggestion}
            />
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SearchScreen;