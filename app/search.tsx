import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';
import { SearchInput } from '@/src/components/search/search-input';
import { SearchSuggestions } from '@/src/components/search/search-suggestions';
import { RecentSearches } from '@/src/components/search/recent-searches';
import { SearchResults } from '@/src/components/search/search-results';
import { styles } from '@/src/styles/search';

interface SearchResult {
  id: string;
  name: string;
  type: 'restaurant' | 'dish';
  rating?: number;
  deliveryTime?: string;
}

type SearchTab = 'all' | 'restaurants' | 'dishes';

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<SearchTab>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Pizza',
    'Burger',
    'Sushi',
    'Chinese',
    'Coffee',
  ]);
  const [suggestions, setSuggestions] = useState<string[]>([
    'Pizza Hut',
    'Burger King',
    'Sushi Roll',
    'Chinese Wok',
    'Starbucks',
  ]);
  const [results, setResults] = useState<SearchResult[]>([
    { id: '1', name: 'Pizza Hut', type: 'restaurant', rating: 4.2, deliveryTime: '25-30 min' },
    { id: '2', name: 'Burger King', type: 'restaurant', rating: 4.0, deliveryTime: '20-25 min' },
    { id: '3', name: 'Margherita Pizza', type: 'dish' },
    { id: '4', name: 'Whopper Burger', type: 'dish' },
    { id: '5', name: 'Sushi Roll', type: 'restaurant', rating: 4.5, deliveryTime: '30-35 min' },
  ]);

  const handleSearch = useCallback((text: string) => {
    setQuery(text);
    // In a real app, you would fetch suggestions and results here
  }, []);

  const handleClearSearch = useCallback(() => {
    setQuery('');
  }, []);

  const handleSelectSuggestion = useCallback((suggestion: string) => {
    setQuery(suggestion);
    // Add to recent searches
    if (!recentSearches.includes(suggestion)) {
      setRecentSearches(prev => [suggestion, ...prev.slice(0, 4)]);
    }
  }, [recentSearches]);

  const handleClearRecent = useCallback(() => {
    setRecentSearches([]);
  }, []);

  const handleRemoveRecent = useCallback((item: string) => {
    setRecentSearches(prev => prev.filter(search => search !== item));
  }, []);

  const handleResultPress = useCallback((result: SearchResult) => {
    if (result.type === 'restaurant') {
      router.push(`/restaurant/${result.id}`);
    } else {
      router.push(`/menu-item/${result.id}`);
    }
  }, [router]);

  const filteredResults = useMemo(() => {
    if (activeTab === 'all') return results;
    return results.filter(result => result.type === (activeTab === 'restaurants' ? 'restaurant' : 'dish'));
  }, [results, activeTab]);

  const tabs: { key: SearchTab; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'restaurants', label: 'Restaurants' },
    { key: 'dishes', label: 'Dishes' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <SearchInput
          value={query}
          onChangeText={handleSearch}
          onClear={handleClearSearch}
          placeholder="Search for restaurants or dishes"
          autoFocus
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {query === '' ? (
          <>
            <RecentSearches
              searches={recentSearches}
              onSelect={handleSelectSuggestion}
              onClear={handleClearRecent}
              onRemove={handleRemoveRecent}
            />
            <SearchSuggestions
              suggestions={suggestions}
              onSelect={handleSelectSuggestion}
            />
          </>
        ) : (
          <>
            <View style={styles.tabContainer}>
              {tabs.map(tab => (
                <TouchableOpacity
                  key={tab.key}
                  style={[
                    styles.tab,
                    activeTab === tab.key && styles.activeTab
                  ]}
                  onPress={() => setActiveTab(tab.key)}
                >
                  <Text style={[
                    styles.tabText,
                    activeTab === tab.key && styles.activeTabText
                  ]}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <SearchResults
              results={filteredResults}
              onResultPress={handleResultPress}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
