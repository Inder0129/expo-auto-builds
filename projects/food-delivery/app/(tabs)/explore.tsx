import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '@/src/components/search/search-bar';
import { RestaurantCard } from '@/src/components/restaurant/restaurant-card';
import { FilterChip } from '@/src/components/filter/filter-chip';
import { colors, spacing, typography } from '@/src/theme';
import { exploreStyles } from '@/src/styles/explore';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  imageUrl: string;
}

interface Filter {
  id: string;
  label: string;
  active: boolean;
}

export default function ExploreScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filters: Filter[] = useMemo(() => [
    { id: 'all', label: 'All', active: true },
    { id: 'rating', label: 'Top Rated', active: false },
    { id: 'fast', label: 'Fast Delivery', active: false },
    { id: 'offers', label: 'Offers', active: false },
  ], []);

  const restaurants: Restaurant[] = useMemo(() => [
    { id: '1', name: 'Burger Palace', cuisine: 'American', rating: 4.5, deliveryTime: '20-30 min', imageUrl: 'https://example.com/burger.jpg' },
    { id: '2', name: 'Sushi Zen', cuisine: 'Japanese', rating: 4.7, deliveryTime: '30-40 min', imageUrl: 'https://example.com/sushi.jpg' },
    { id: '3', name: 'Pizza Corner', cuisine: 'Italian', rating: 4.3, deliveryTime: '25-35 min', imageUrl: 'https://example.com/pizza.jpg' },
    { id: '4', name: 'Taco Fiesta', cuisine: 'Mexican', rating: 4.2, deliveryTime: '15-25 min', imageUrl: 'https://example.com/taco.jpg' },
    { id: '5', name: 'Curry House', cuisine: 'Indian', rating: 4.6, deliveryTime: '35-45 min', imageUrl: 'https://example.com/curry.jpg' },
  ], []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    console.log('Search:', query);
  }, []);

  const handleFilterPress = useCallback((filterId: string) => {
    setSelectedFilter(filterId);
    console.log('Filter selected:', filterId);
  }, []);

  const handleRestaurantPress = useCallback((restaurantId: string) => {
    console.log('Restaurant pressed:', restaurantId);
  }, []);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant: Restaurant) => {
      if (searchQuery) {
        return restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    });
  }, [restaurants, searchQuery]);

  return (
    <SafeAreaView style={exploreStyles.container} edges={['top']}>
      <View style={exploreStyles.header}>
        <Text style={exploreStyles.title}>Explore Restaurants</Text>
        <View style={exploreStyles.searchContainer}>
          <SearchBar onSearch={handleSearch} placeholder="Search restaurants or cuisines" />
        </View>
      </View>

      <View style={exploreStyles.filterSection}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filters}
          keyExtractor={(item: Filter) => item.id}
          renderItem={({ item }: { item: Filter }) => (
            <FilterChip
              filter={item}
              isSelected={selectedFilter === item.id}
              onPress={() => handleFilterPress(item.id)}
            />
          )}
          contentContainerStyle={exploreStyles.filterList}
        />
      </View>

      <FlatList
        data={filteredRestaurants}
        keyExtractor={(item: Restaurant) => item.id}
        renderItem={({ item }: { item: Restaurant }) => (
          <RestaurantCard
            restaurant={item}
            onPress={() => handleRestaurantPress(item.id)}
            style={exploreStyles.restaurantCard}
          />
        )}
        contentContainerStyle={exploreStyles.restaurantList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
