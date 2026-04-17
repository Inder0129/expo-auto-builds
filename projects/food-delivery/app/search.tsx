import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { Button } from '@/src/components/ui';
import { SearchInput } from '@/src/components/search';
import { SuggestionList } from '@/src/components/search';
import { RecentSearches } from '@/src/components/search';
import { styles } from '@/src/styles/search';

interface SearchSuggestion {
  id: string;
  name: string;
  type: 'restaurant' | 'dish' | 'cuisine';
}

interface RecentSearch {
  id: string;
  query: string;
  timestamp: number;
}

type SearchScreenProps = Record<string, never>;

const SearchScreen: React.FC<SearchScreenProps> = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([
    { id: '1', name: 'Pizza Hut', type: 'restaurant' },
    { id: '2', name: 'Burger King', type: 'restaurant' },
    { id: '3', name: 'Margherita Pizza', type: 'dish' },
    { id: '4', name: 'Italian', type: 'cuisine' },
  ]);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([
    { id: '1', query: 'Sushi', timestamp: Date.now() - 3600000 },
    { id: '2', query: 'Chinese', timestamp: Date.now() - 7200000 },
    { id: '3', query: 'Burger', timestamp: Date.now() - 10800000 },
  ]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    // In a real app, you would fetch suggestions based on query
  }, []);

  const handleSuggestionPress = useCallback((suggestion: SearchSuggestion) => {
    router.push(`/search?q=${encodeURIComponent(suggestion.name)}`);
  }, [router]);

  const handleRecentSearchPress = useCallback((search: RecentSearch) => {
    setSearchQuery(search.query);
    router.push(`/search?q=${encodeURIComponent(search.query)}`);
  }, [router]);

  const handleClearRecent = useCallback(() => {
    setRecentSearches([]);
  }, []);

  const filteredSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return suggestions;
    return suggestions.filter((suggestion: SearchSuggestion) =>
      suggestion.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, suggestions]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <SearchInput
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search restaurants, dishes, cuisines..."
          autoFocus={true}
        />
        <Button
          title="Cancel"
          variant="text"
          onPress={() => router.back()}
          style={styles.cancelButton}
        />
      </View>

      <View style={styles.content}>
        {searchQuery ? (
          <SuggestionList
            suggestions={filteredSuggestions}
            onSuggestionPress={handleSuggestionPress}
          />
        ) : (
          <RecentSearches
            searches={recentSearches}
            onSearchPress={handleRecentSearchPress}
            onClear={handleClearRecent}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;