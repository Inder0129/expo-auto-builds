import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { RestaurantCard } from '@/src/components/restaurant-card';
import { FilterChip } from '@/src/components/filter-chip';
import { SearchBar } from '@/src/components/search-bar';
import { CategoryGrid } from '@/src/components/category-grid';
import { useAppSelector } from '@/src/store/hooks';
import { Restaurant } from '@/src/store/slices/restaurants';
import { Category } from '@/src/constants';
import { styles } from '@/src/styles/explore';

interface ExploreScreenProps {}

type Filter = {
  id: string;
  label: string;
  icon: string;
};

export default function ExploreScreen(props: ExploreScreenProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const restaurants = useAppSelector((state: any) => state.restaurants.all);
  const categories = useAppSelector((state: any) => state.restaurants.categories);
  
  const filters: Filter[] = useMemo(() => [
    { id: 'all', label: 'All', icon: 'grid' },
    { id: 'rating', label: 'Rating 4.0+', icon: 'star' },
    { id: 'fast', label: 'Fast Delivery', icon: 'time' },
    { id: 'offers', label: 'Offers', icon: 'pricetag' },
    { id: 'veg', label: 'Pure Veg', icon: 'leaf' },
  ], []);
  
  const filteredRestaurants = useMemo(() => {
    if (selectedFilter === 'all' && !selectedCategory) return restaurants;
    
    return restaurants.filter((restaurant: Restaurant) => {
      const matchesFilter = selectedFilter === 'all' || 
        (selectedFilter === 'rating' && restaurant.rating >= 4.0) ||
        (selectedFilter === 'fast' && restaurant.deliveryTime <= 30) ||
        (selectedFilter === 'offers' && restaurant.hasOffers) ||
        (selectedFilter === 'veg' && restaurant.isVeg);
      
      const matchesCategory = !selectedCategory || restaurant.categoryIds.includes(selectedCategory);
      
      return matchesFilter && matchesCategory;
    });
  }, [restaurants, selectedFilter, selectedCategory]);
  
  const handleSearchPress = useCallback(() => {
    // Navigate to search screen
  }, []);
  
  const handleFilterPress = useCallback((filterId: string) => {
    setSelectedFilter(filterId);
  }, []);
  
  const handleCategoryPress = useCallback((categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
  }, [selectedCategory]);
  
  const handleRestaurantPress = useCallback((restaurantId: string) => {
    // Navigate to restaurant detail
  }, []);
  
  const renderFilterItem = useCallback(({ item }: { item: Filter }) => (
    <FilterChip
      filter={item}
      isSelected={selectedFilter === item.id}
      onPress={() => handleFilterPress(item.id)}
      style={styles.filterChip}
    />
  ), [selectedFilter, handleFilterPress]);
  
  const renderRestaurantItem = useCallback(({ item }: { item: Restaurant }) => (
    <RestaurantCard
      restaurant={item}
      onPress={() => handleRestaurantPress(item.id)}
      style={styles.restaurantCard}
      variant="compact"
    />
  ), [handleRestaurantPress]);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          placeholder="Search restaurants or dishes"
          onPress={handleSearchPress}
          style={styles.searchBar}
        />
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <CategoryGrid
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryPress={handleCategoryPress}
            style={styles.categoryGrid}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Filters</Text>
          <FlatList
            horizontal
            data={filters}
            renderItem={renderFilterItem}
            keyExtractor={(item: Filter) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterList}
          />
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Restaurants</Text>
            <Text style={styles.resultCount}>{filteredRestaurants.length} results</Text>
          </View>
          
          {filteredRestaurants.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={64} color={colors.textSecondary} />
              <Text style={styles.emptyStateTitle}>No restaurants found</Text>
              <Text style={styles.emptyStateText}>Try changing your filters or search term</Text>
            </View>
          ) : (
            <FlatList
              data={filteredRestaurants}
              renderItem={renderRestaurantItem}
              keyExtractor={(item: Restaurant) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.restaurantList}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
