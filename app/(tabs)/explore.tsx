import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SearchBar } from '@/src/components/explore/search-bar';
import { CategoryFilter } from '@/src/components/explore/category-filter';
import { RestaurantGrid } from '@/src/components/explore/restaurant-grid';
import { FilterModal } from '@/src/components/explore/filter-modal';
import { styles } from '@/src/styles/explore';
import { colors } from '@/src/theme';

type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  priceRange: string;
  imageUrl: string;
};

type Category = {
  id: string;
  name: string;
  isActive: boolean;
};

type Filter = {
  sortBy: 'rating' | 'deliveryTime' | 'price';
  minRating: number;
  priceRange: [number, number];
};

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFilterModalVisible, setIsFilterModalVisible] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filter>({
    sortBy: 'rating',
    minRating: 4.0,
    priceRange: [0, 1000],
  });

  const categories: Category[] = useMemo(() => [
    { id: 'all', name: 'All', isActive: true },
    { id: 'burgers', name: 'Burgers', isActive: false },
    { id: 'pizza', name: 'Pizza', isActive: false },
    { id: 'sushi', name: 'Sushi', isActive: false },
    { id: 'indian', name: 'Indian', isActive: false },
    { id: 'chinese', name: 'Chinese', isActive: false },
    { id: 'desserts', name: 'Desserts', isActive: false },
  ], []);

  const restaurants: Restaurant[] = useMemo(() => [
    { id: '1', name: 'Burger Palace', cuisine: 'American', rating: 4.5, deliveryTime: '20-30 min', priceRange: '₹₹', imageUrl: 'https://example.com/burger.jpg' },
    { id: '2', name: 'Pizza Heaven', cuisine: 'Italian', rating: 4.7, deliveryTime: '25-35 min', priceRange: '₹₹₹', imageUrl: 'https://example.com/pizza.jpg' },
    { id: '3', name: 'Sushi Zen', cuisine: 'Japanese', rating: 4.8, deliveryTime: '30-40 min', priceRange: '₹₹₹₹', imageUrl: 'https://example.com/sushi.jpg' },
    { id: '4', name: 'Curry House', cuisine: 'Indian', rating: 4.6, deliveryTime: '35-45 min', priceRange: '₹₹', imageUrl: 'https://example.com/curry.jpg' },
    { id: '5', name: 'Noodle Bar', cuisine: 'Chinese', rating: 4.4, deliveryTime: '25-35 min', priceRange: '₹₹', imageUrl: 'https://example.com/noodle.jpg' },
    { id: '6', name: 'Sweet Treats', cuisine: 'Desserts', rating: 4.9, deliveryTime: '15-25 min', priceRange: '₹₹₹', imageUrl: 'https://example.com/dessert.jpg' },
  ], []);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant: Restaurant) => {
      const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || restaurant.cuisine.toLowerCase().includes(selectedCategory);
      const matchesRating = restaurant.rating >= filters.minRating;
      return matchesSearch && matchesCategory && matchesRating;
    }).sort((a: Restaurant, b: Restaurant) => {
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'deliveryTime') {
        const aTime = parseInt(a.deliveryTime);
        const bTime = parseInt(b.deliveryTime);
        return aTime - bTime;
      }
      return 0;
    });
  }, [restaurants, searchQuery, selectedCategory, filters]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleRestaurantPress = useCallback((restaurantId: string) => {
    console.log('Restaurant pressed:', restaurantId);
  }, []);

  const handleFilterPress = useCallback(() => {
    setIsFilterModalVisible(true);
  }, []);

  const handleFilterApply = useCallback((newFilters: Filter) => {
    setFilters(newFilters);
    setIsFilterModalVisible(false);
  }, []);

  const handleFilterClose = useCallback(() => {
    setIsFilterModalVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={handleSearch}
        onFilterPress={handleFilterPress}
      />
      
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      
      <RestaurantGrid
        restaurants={filteredRestaurants}
        onRestaurantPress={handleRestaurantPress}
      />
      
      <FilterModal
        visible={isFilterModalVisible}
        filters={filters}
        onApply={handleFilterApply}
        onClose={handleFilterClose}
      />
    </View>
  );
}
