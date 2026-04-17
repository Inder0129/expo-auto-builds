import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '@/src/components/search/SearchBar';
import SearchFilters from '@/src/components/search/SearchFilters';
import SearchResults from '@/src/components/search/SearchResults';
import { useAppSelector } from '@/src/store/hooks';
import { selectRestaurants } from '@/src/store/slices/restaurants';
import styles from '@/src/styles/search';

type SearchType = 'restaurants' | 'dishes';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('restaurants');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const restaurants = useAppSelector(selectRestaurants);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.cuisines.some(cuisine => cuisine.toLowerCase().includes(query))
    );
  }, [searchQuery, restaurants]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleFilterToggle = useCallback((filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  }, []);

  const handleSearchTypeChange = useCallback((type: SearchType) => {
    setSearchType(type);
  }, []);

  const handleResultPress = useCallback((restaurantId: string) => {
    // Navigate to restaurant detail
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        searchType={searchType}
        onSearchTypeChange={handleSearchTypeChange}
      />
      <SearchFilters
        selectedFilters={selectedFilters}
        onFilterToggle={handleFilterToggle}
      />
      <SearchResults
        results={searchResults}
        searchType={searchType}
        onResultPress={handleResultPress}
      />
    </SafeAreaView>
  );
}
