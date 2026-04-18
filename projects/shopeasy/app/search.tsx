import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SearchInput from '@/src/components/search/search-input';
import RecentSearches from '@/src/components/search/recent-searches';
import TrendingTags from '@/src/components/search/trending-tags';
import { colors } from '@/src/theme';
import { searchStyles } from '@/src/styles/search';

interface SearchResult {
  id: string;
  name: string;
  category: string;
  price: number;
}

interface RecentSearch {
  id: string;
  query: string;
  timestamp: string;
}

interface TrendingTag {
  id: string;
  name: string;
  count: number;
}

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([
    { id: '1', query: 'Wireless Headphones', timestamp: '2 hours ago' },
    { id: '2', query: 'Running Shoes', timestamp: '1 day ago' },
    { id: '3', query: 'Smart Watch', timestamp: '3 days ago' },
  ]);
  const [trendingTags, setTrendingTags] = useState<TrendingTag[]>([
    { id: '1', name: 'Summer Sale', count: 245 },
    { id: '2', name: 'Electronics', count: 189 },
    { id: '3', name: 'Fashion', count: 156 },
    { id: '4', name: 'Home Decor', count: 132 },
  ]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const newSearch: RecentSearch = {
        id: Date.now().toString(),
        query,
        timestamp: 'Just now',
      };
      setRecentSearches((prev: RecentSearch[]) => [newSearch, ...prev.slice(0, 4)]);
      setSearchResults([
        { id: '1', name: 'Product 1', category: 'Electronics', price: 99.99 },
        { id: '2', name: 'Product 2', category: 'Fashion', price: 49.99 },
      ]);
    } else {
      setSearchResults([]);
    }
  }, []);

  const handleClearRecent = useCallback(() => {
    setRecentSearches([]);
  }, []);

  const handleTagPress = useCallback((tag: TrendingTag) => {
    setSearchQuery(tag.name);
    handleSearch(tag.name);
  }, [handleSearch]);

  const handleResultPress = useCallback((result: SearchResult) => {
    router.push(`/product-detail?id=${result.id}`);
  }, [router]);

  const renderSearchResult = useCallback(({ item }: { item: SearchResult }) => (
    <TouchableOpacity style={searchStyles.resultItem} onPress={() => handleResultPress(item)}>
      <View style={searchStyles.resultContent}>
        <Text style={searchStyles.resultName}>{item.name}</Text>
        <Text style={searchStyles.resultCategory}>{item.category}</Text>
        <Text style={searchStyles.resultPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  ), [handleResultPress]);

  const showResults = useMemo(() => searchQuery.trim().length > 0, [searchQuery]);

  return (
    <SafeAreaView style={searchStyles.container} edges={['top']}>
      <View style={searchStyles.header}>
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmit={() => handleSearch(searchQuery)}
          placeholder="Search products..."
        />
      </View>

      {showResults ? (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item: SearchResult) => item.id}
          contentContainerStyle={searchStyles.resultsList}
          ListEmptyComponent={(
            <View style={searchStyles.emptyContainer}>
              <Ionicons name="search-outline" size={64} color={colors.border} />
              <Text style={searchStyles.emptyText}>No results found</Text>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={[]}
          renderItem={null}
          ListHeaderComponent={(
            <>
              <RecentSearches
                searches={recentSearches}
                onSearchPress={handleSearch}
                onClearPress={handleClearRecent}
              />
              <TrendingTags
                tags={trendingTags}
                onTagPress={handleTagPress}
              />
            </>
          )}
          contentContainerStyle={searchStyles.contentContainer}
        />
      )}
    </SafeAreaView>
  );
}
