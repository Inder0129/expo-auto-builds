import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { RestaurantCard } from '@/src/components/restaurant-card';
import { FilterChip } from '@/src/components/filter-chip';
import { SearchBar } from '@/src/components/search-bar';
import { CategoryGrid } from '@/src/components/category-grid';
import { exploreStyles } from '@/src/styles/explore';

interface Restaurant {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  cuisine: string;
  imageUrl: string;
}

interface Filter {
  id: string;
  label: string;
  icon: string;
}

export default function ExploreScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filters: Filter[] = useMemo(() => [
    { id: 'all', label: 'All', icon: 'grid' },
    { id: 'rating', label: 'Rating 4.0+', icon: 'star' },
    { id: 'fast', label: 'Fast Delivery', icon: 'time' },
    { id: 'veg', label: 'Pure Veg', icon: 'leaf' },
    { id: 'offers', label: 'Offers', icon: 'pricetag' },
  ], []);

  const restaurants: Restaurant[] = useMemo(() => [
    { id: '1', name: 'Burger Palace', rating: 4.5, deliveryTime: '25-30 min', cuisine: 'American', imageUrl: 'https://example.com/burger.jpg' },
    { id: '2', name: 'Sushi Zen', rating: 4.8, deliveryTime: '35-40 min', cuisine: 'Japanese', imageUrl: 'https://example.com/sushi.jpg' },
    { id: '3', name: 'Pizza Heaven', rating: 4.3, deliveryTime: '20-25 min', cuisine: 'Italian', imageUrl: 'https://example.com/pizza.jpg' },
    { id: '4', name: 'Chinese Wok', rating: 4.2, deliveryTime: '30-35 min', cuisine: 'Chinese', imageUrl: 'https://example.com/chinese.jpg' },
    { id: '5', name: 'Curry House', rating: 4.6, deliveryTime: '40-45 min', cuisine: 'Indian', imageUrl: 'https://example.com/curry.jpg' },
    { id: '6', name: 'Dessert Corner', rating: 4.4, deliveryTime: '15-20 min', cuisine: 'Desserts', imageUrl: 'https://example.com/dessert.jpg' },
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

  const handleCategoryPress = useCallback((categoryId: string) => {
    console.log('Category pressed:', categoryId);
  }, []);

  const renderFilterItem = useCallback(({ item }: { item: Filter }) => (
    <FilterChip
      filter={item}
      isSelected={selectedFilter === item.id}
      onPress={() => handleFilterPress(item.id)}
    />
  ), [selectedFilter, handleFilterPress]);

  const renderRestaurantItem = useCallback(({ item }: { item: Restaurant }) => (
    <View style={exploreStyles.restaurantItem}>
      <RestaurantCard
        restaurant={item}
        onPress={() => handleRestaurantPress(item.id)}
      />
    </View>
  ), [handleRestaurantPress]);

  return (
    <ScrollView style={exploreStyles.container} showsVerticalScrollIndicator={false}>
      <View style={exploreStyles.header}>
        <Text style={exploreStyles.title}>Explore</Text>
        <TouchableOpacity style={exploreStyles.filterButton}>
          <Ionicons name="filter" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <SearchBar onSearch={handleSearch} placeholder="Search restaurants, cuisines, dishes" />

      <View style={exploreStyles.section}>
        <Text style={exploreStyles.sectionTitle}>Categories</Text>
        <CategoryGrid onCategoryPress={handleCategoryPress} />
      </View>

      <View style={exploreStyles.section}>
        <Text style={exploreStyles.sectionTitle}>Filters</Text>
        <FlatList
          horizontal
          data={filters}
          renderItem={renderFilterItem}
          keyExtractor={(item: Filter) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={exploreStyles.filtersList}
        />
      </View>

      <View style={exploreStyles.section}>
        <View style={exploreStyles.sectionHeader}>
          <Text style={exploreStyles.sectionTitle}>Restaurants Near You</Text>
          <TouchableOpacity>
            <Text style={exploreStyles.sortText}>Sort</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={restaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={(item: Restaurant) => item.id}
          scrollEnabled={false}
          numColumns={2}
          columnWrapperStyle={exploreStyles.restaurantsGrid}
        />
      </View>
    </ScrollView>
  );
}
