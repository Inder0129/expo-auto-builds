import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { RestaurantCard } from '@/src/components/restaurant-card';
import { useAppSelector } from '@/src/store/hooks';
import { styles } from '@/src/styles/explore';

interface ExploreScreenProps {}

type Filter = {
  id: string;
  label: string;
  icon: string;
};

type Category = {
  id: string;
  name: string;
  icon: string;
};

type Restaurant = {
  id: string;
  name: string;
  description: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  imageUrl: string;
  cuisine: string;
  hasOffers: boolean;
  isVeg: boolean;
  categoryIds: string[];
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
        (selectedFilter === 'fast' && parseInt(restaurant.deliveryTime) <= 30) ||
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
    <TouchableOpacity
      style={[
        { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8, flexDirection: 'row', alignItems: 'center' },
        selectedFilter === item.id ? { backgroundColor: colors.primary } : { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border }
      ]}
      onPress={() => handleFilterPress(item.id)}
    >
      <Ionicons name={item.icon as any} size={16} color={selectedFilter === item.id ? colors.white : colors.textSecondary} style={{ marginRight: 4 }} />
      <Text style={{ fontSize: 14, color: selectedFilter === item.id ? colors.white : colors.textSecondary }}>{item.label}</Text>
    </TouchableOpacity>
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
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, flex: 1 }}
          onPress={handleSearchPress}
        >
          <Ionicons name="search" size={20} color={colors.textSecondary} style={{ marginRight: 8 }} />
          <Text style={{ fontSize: 16, color: colors.textSecondary }}>Search restaurants or dishes</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16 }}>
            {categories.map((category: Category) => (
              <TouchableOpacity
                key={category.id}
                style={{ alignItems: 'center', marginRight: 16, width: 80 }}
                onPress={() => handleCategoryPress(category.id)}
              >
                <View style={[
                  { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
                  selectedCategory === category.id ? { backgroundColor: colors.primary } : { backgroundColor: colors.surface }
                ]}>
                  <Ionicons name={category.icon as any} size={24} color={selectedCategory === category.id ? colors.white : colors.primary} />
                </View>
                <Text style={[
                  { fontSize: 12, fontWeight: '500', textAlign: 'center' },
                  selectedCategory === category.id ? { color: colors.primary } : { color: colors.text }
                ]} numberOfLines={2}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
