import React, { useState, useCallback, useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { SearchBar } from '@/src/components/explore/search-bar';
import { FilterChips } from '@/src/components/explore/filter-chips';
import { RestaurantGrid } from '@/src/components/explore/restaurant-grid';
import { CuisineFilter } from '@/src/components/explore/cuisine-filter';
import { styles } from '@/src/styles/explore';

type Restaurant = {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  cuisine: string;
  priceRange: string;
  imageUrl: string;
};

type Filter = {
  id: string;
  label: string;
  value: string;
};

type Cuisine = {
  id: string;
  name: string;
  selected: boolean;
};

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

  const restaurants: Restaurant[] = useMemo(() => [
    { id: '1', name: 'Burger Palace', rating: 4.5, deliveryTime: '20-30 min', cuisine: 'American', priceRange: '$$', imageUrl: 'https://example.com/burger.jpg' },
    { id: '2', name: 'Pizza Corner', rating: 4.2, deliveryTime: '25-35 min', cuisine: 'Italian', priceRange: '$$', imageUrl: 'https://example.com/pizza.jpg' },
    { id: '3', name: 'Sushi World', rating: 4.7, deliveryTime: '30-40 min', cuisine: 'Japanese', priceRange: '$$$', imageUrl: 'https://example.com/sushi.jpg' },
    { id: '4', name: 'Taco Fiesta', rating: 4.3, deliveryTime: '15-25 min', cuisine: 'Mexican', priceRange: '$', imageUrl: 'https://example.com/taco.jpg' },
    { id: '5', name: 'Curry House', rating: 4.6, deliveryTime: '30-40 min', cuisine: 'Indian', priceRange: '$$', imageUrl: 'https://example.com/curry.jpg' },
    { id: '6', name: 'Noodle Bar', rating: 4.4, deliveryTime: '20-30 min', cuisine: 'Chinese', priceRange: '$$', imageUrl: 'https://example.com/noodle.jpg' },
  ], []);

  const filters: Filter[] = useMemo(() => [
    { id: '1', label: 'Fast Delivery', value: 'fast' },
    { id: '2', label: 'Rating 4.0+', value: 'rating' },
    { id: '3', label: 'Offers', value: 'offers' },
    { id: '4', label: 'Pure Veg', value: 'veg' },
    { id: '5', label: 'Open Now', value: 'open' },
  ], []);

  const cuisines: Cuisine[] = useMemo(() => [
    { id: '1', name: 'American', selected: false },
    { id: '2', name: 'Italian', selected: false },
    { id: '3', name: 'Japanese', selected: false },
    { id: '4', name: 'Mexican', selected: false },
    { id: '5', name: 'Indian', selected: false },
    { id: '6', name: 'Chinese', selected: false },
  ], []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  }, []);

  const handleFilterPress = useCallback((filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter((id: string) => id !== filterId) 
        : [...prev, filterId]
    );
  }, []);

  const handleCuisineSelect = useCallback((cuisineId: string) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisineId) 
        ? prev.filter((id: string) => id !== cuisineId) 
        : [...prev, cuisineId]
    );
  }, []);

  const handleRestaurantPress = useCallback((restaurantId: string) => {
    console.log('Restaurant pressed:', restaurantId);
  }, []);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant: Restaurant) => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCuisine = selectedCuisines.length === 0 || selectedCuisines.includes(restaurant.cuisine);
      return matchesSearch && matchesCuisine;
    });
  }, [restaurants, searchQuery, selectedCuisines]);

  return (
    <View style={styles.container}>
      <SearchBar 
        value={searchQuery} 
        onChangeText={handleSearch} 
        placeholder="Search restaurants or cuisines" 
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Filters</Text>
          <FilterChips 
            filters={filters} 
            selectedFilters={selectedFilters} 
            onFilterPress={handleFilterPress} 
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuisines</Text>
          <CuisineFilter 
            cuisines={cuisines} 
            selectedCuisines={selectedCuisines} 
            onCuisineSelect={handleCuisineSelect} 
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Restaurants</Text>
            <Text style={styles.resultCount}>{filteredRestaurants.length} results</Text>
          </View>
          <RestaurantGrid 
            restaurants={filteredRestaurants} 
            onRestaurantPress={handleRestaurantPress} 
          />
        </View>
      </ScrollView>
    </View>
  );
}
