import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { RestaurantCard } from '@/src/components/restaurant-card';
import { FilterChip } from '@/src/components/filter-chip';
import { SearchBar } from '@/src/components/search-bar';
import { CategoryGrid } from '@/src/components/category-grid';
import { useAppSelector } from '@/src/store/hooks';
import { Restaurant } from '@/src/store/slices/restaurants';
import { Category } from '@/src/types';
import { Filter } from '@/src/types';
import styles from '@/src/styles/explore';

interface ExploreScreenProps {}

export default function ExploreScreen(props: ExploreScreenProps) {
  const restaurants = useAppSelector((state: any) => state.restaurants.all);
  const categories = useAppSelector((state: any) => state.restaurants.categories);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filters: Filter[] = useMemo(() => [
    { id: 'rating', label: 'Rating 4.0+' },
    { id: 'delivery', label: 'Fast Delivery' },
    { id: 'offers', label: 'Offers' },
    { id: 'pure_veg', label: 'Pure Veg' },
    { id: 'non_veg', label: 'Non Veg' }
  ], []);

  const filteredRestaurants = useMemo(() => {
    let filtered = restaurants;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((restaurant: Restaurant) => 
        restaurant.categories.includes(selectedCategory)
      );
    }
    
    if (selectedFilters.includes('rating')) {
      filtered = filtered.filter((restaurant: Restaurant) => restaurant.rating >= 4.0);
    }
    
    if (selectedFilters.includes('delivery')) {
      filtered = filtered.filter((restaurant: Restaurant) => restaurant.deliveryTime <= 30);
    }
    
    if (selectedFilters.includes('offers')) {
      filtered = filtered.filter((restaurant: Restaurant) => restaurant.hasOffers);
    }
    
    if (selectedFilters.includes('pure_veg')) {
      filtered = filtered.filter((restaurant: Restaurant) => restaurant.isPureVeg);
    }
    
    if (selectedFilters.includes('non_veg')) {
      filtered = filtered.filter((restaurant: Restaurant) => !restaurant.isPureVeg);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((restaurant: Restaurant) => 
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.cuisines.some((cuisine: string) => cuisine.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [restaurants, selectedCategory, selectedFilters, searchQuery]);

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleFilterToggle = useCallback((filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId)
        ? prev.filter((id: string) => id !== filterId)
        : [...prev, filterId]
    );
  }, []);

  const handleRestaurantPress = useCallback((restaurantId: string) => {
    // Navigate to restaurant modal
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedCategory('all');
    setSelectedFilters([]);
    setSearchQuery('');
  }, []);

  const renderFilterItem = useCallback(({ item }: { item: Filter }) => (
    <FilterChip
      filter={item}
      isSelected={selectedFilters.includes(item.id)}
      onPress={() => handleFilterToggle(item.id)}
      style={styles.filterItem}
    />
  ), [selectedFilters, handleFilterToggle]);

  const renderRestaurantItem = useCallback(({ item }: { item: Restaurant }) => (
    <RestaurantCard
      restaurant={item}
      onPress={() => handleRestaurantPress(item.id)}
      style={styles.restaurantItem}
      variant="compact"
    />
  ), [handleRestaurantPress]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <SearchBar
        placeholder="Search restaurants, cuisines, dishes"
        value={searchQuery}
        onChangeText={handleSearchChange}
        style={styles.searchBar}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <CategoryGrid
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </View>

        <View style={styles.filtersSection}>
          <View style={styles.filtersHeader}>
            <Text style={styles.sectionTitle}>Filters</Text>
            {selectedFilters.length > 0 && (
              <TouchableOpacity onPress={handleClearFilters}>
                <Text style={styles.clearText}>Clear all</Text>
              </TouchableOpacity>
            )}
          </View>
          <FlatList
            data={filters}
            renderItem={renderFilterItem}
            keyExtractor={(item: Filter) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersList}
          />
        </View>

        <View style={styles.restaurantsSection}>
          <View style={styles.restaurantsHeader}>
            <Text style={styles.sectionTitle}>
              {filteredRestaurants.length} Restaurants Found
            </Text>
            <TouchableOpacity style={styles.sortButton}>
              <Text style={styles.sortText}>Sort</Text>
              <Ionicons name="swap-vertical" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
          
          {filteredRestaurants.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={64} color={colors.border} />
              <Text style={styles.emptyTitle}>No restaurants found</Text>
              <Text style={styles.emptyDescription}>
                Try adjusting your filters or search query
              </Text>
              <TouchableOpacity style={styles.clearButton} onPress={handleClearFilters}>
                <Text style={styles.clearButtonText}>Clear Filters</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={filteredRestaurants}
              renderItem={renderRestaurantItem}
              keyExtractor={(item: Restaurant) => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.restaurantsList}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
