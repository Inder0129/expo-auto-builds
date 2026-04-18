import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { RestaurantCard } from '@/src/components/restaurant-card';
import { FilterChip } from '@/src/components/filter-chip';
import { SearchBar } from '@/src/components/search-bar';
import { CategoryGrid } from '@/src/components/category-grid';
import { useAppSelector } from '@/src/store/hooks';
import { Restaurant } from '@/src/store/slices/restaurants';
import { styles } from '@/src/styles/explore';

interface Filter {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export default function ExploreScreen() {
  const restaurants = useAppSelector((state: any) => state.restaurants.all);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  
  const filters = useMemo<Filter[]>(() => [
    { id: 'all', label: 'All', icon: 'apps' },
    { id: 'rating', label: 'Rating 4.0+', icon: 'star' },
    { id: 'fast', label: 'Fast Delivery', icon: 'time' },
    { id: 'offers', label: 'Offers', icon: 'pricetag' },
  ], []);
  
  const handleSearchPress = useCallback(() => {
    // Navigate to search screen
  }, []);
  
  const handleFilterPress = useCallback((filterId: string) => {
    setSelectedFilter(filterId);
  }, []);
  
  const handleRestaurantPress = useCallback((restaurantId: string) => {
    // Navigate to restaurant detail
  }, []);
  
  const renderFilterItem = useCallback(({ item }: { item: Filter }) => (
    <FilterChip
      filter={item}
      isSelected={selectedFilter === item.id}
      onPress={() => handleFilterPress(item.id)}
    />
  ), [selectedFilter, handleFilterPress]);
  
  const renderRestaurantItem = useCallback(({ item }: { item: Restaurant }) => (
    <RestaurantCard
      restaurant={item}
      onPress={() => handleRestaurantPress(item.id)}
      variant="compact"
    />
  ), [handleRestaurantPress]);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
          <SearchBar onPress={handleSearchPress} />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <CategoryGrid />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Filters</Text>
          <FlatList
            horizontal
            data={filters}
            renderItem={renderFilterItem}
            keyExtractor={(item: Filter) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersList}
          />
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
            <Link href="/explore" style={styles.seeAllLink}>See All</Link>
          </View>
          <FlatList
            data={restaurants}
            renderItem={renderRestaurantItem}
            keyExtractor={(item: Restaurant) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.restaurantsList}
          />
        </View>
      </ScrollView>
    </View>
  );
}
