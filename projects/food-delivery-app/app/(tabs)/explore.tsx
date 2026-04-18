import React, { useState, useCallback, useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';
import { Button } from '@/src/components/ui';
import { Card } from '@/src/components/ui';
import { SearchBar } from '@/src/components/explore/search-bar';
import { CategoryFilter } from '@/src/components/explore/category-filter';
import { RestaurantGrid } from '@/src/components/explore/restaurant-grid';
import { FilterModal } from '@/src/components/explore/filter-modal';
import { Restaurant } from '@/src/types/restaurant';
import { Category } from '@/src/types/category';
import { FilterOptions } from '@/src/types/filter';
import { styles } from '@/src/styles/explore';

type ExploreScreenProps = {};

const ExploreScreen: React.FC<ExploreScreenProps> = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterOptions>({
    rating: 0,
    deliveryTime: 30,
    priceRange: 'all',
    cuisines: []
  });
  
  const categories: Category[] = useMemo(() => [
    { id: 'all', name: 'All', icon: 'grid-outline' },
    { id: '1', name: 'Burgers', icon: 'fast-food-outline' },
    { id: '2', name: 'Pizza', icon: 'pizza-outline' },
    { id: '3', name: 'Sushi', icon: 'fish-outline' },
    { id: '4', name: 'Chinese', icon: 'restaurant-outline' },
    { id: '5', name: 'Indian', icon: 'flame-outline' },
    { id: '6', name: 'Desserts', icon: 'ice-cream-outline' }
  ], []);
  
  const restaurants: Restaurant[] = useMemo(() => [
    {
      id: '1',
      name: 'Burger Palace',
      cuisine: 'American',
      rating: 4.5,
      deliveryTime: '20-30 min',
      imageUrl: 'https://example.com/burger.jpg',
      isOpen: true,
      distance: '1.2 km',
      priceRange: '₹₹'
    },
    {
      id: '2',
      name: 'Pizza Heaven',
      cuisine: 'Italian',
      rating: 4.7,
      deliveryTime: '25-35 min',
      imageUrl: 'https://example.com/pizza.jpg',
      isOpen: true,
      distance: '2.5 km',
      priceRange: '₹₹₹'
    },
    {
      id: '3',
      name: 'Sushi Master',
      cuisine: 'Japanese',
      rating: 4.8,
      deliveryTime: '30-40 min',
      imageUrl: 'https://example.com/sushi.jpg',
      isOpen: true,
      distance: '3.1 km',
      priceRange: '₹₹₹₹'
    },
    {
      id: '4',
      name: 'Curry House',
      cuisine: 'Indian',
      rating: 4.3,
      deliveryTime: '15-25 min',
      imageUrl: 'https://example.com/curry.jpg',
      isOpen: true,
      distance: '0.8 km',
      priceRange: '₹₹'
    }
  ], []);
  
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  }, [router]);
  
  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
  }, []);
  
  const handleRestaurantPress = useCallback((restaurantId: string) => {
    router.push(`/restaurant/${restaurantId}`);
  }, [router]);
  
  const handleFilterPress = useCallback(() => {
    setShowFilters(true);
  }, []);
  
  const handleApplyFilters = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    setShowFilters(false);
  }, []);
  
  const handleClearFilters = useCallback(() => {
    setFilters({
      rating: 0,
      deliveryTime: 30,
      priceRange: 'all',
      cuisines: []
    });
    setShowFilters(false);
  }, []);
  
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant: Restaurant) => {
      if (selectedCategory !== 'all') {
        // In a real app, you would filter by actual category
        return restaurant.cuisine.toLowerCase().includes(categories.find((c: Category) => c.id === selectedCategory)?.name.toLowerCase() || '');
      }
      return true;
    });
  }, [restaurants, selectedCategory, categories]);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar 
          value={searchQuery} 
          onChangeText={handleSearch} 
          placeholder="Search restaurants or cuisines" 
        />
        <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
          <Ionicons name="filter-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={handleCategorySelect} 
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>
            {filteredRestaurants.length} Restaurants Found
          </Text>
          <TouchableOpacity onPress={handleFilterPress}>
            <Text style={styles.filterLinkText}>Filter</Text>
          </TouchableOpacity>
        </View>
        
        <RestaurantGrid 
          restaurants={filteredRestaurants} 
          onRestaurantPress={handleRestaurantPress} 
        />
      </ScrollView>
      
      <FilterModal 
        visible={showFilters} 
        filters={filters} 
        onApply={handleApplyFilters} 
        onClear={handleClearFilters} 
        onClose={() => setShowFilters(false)} 
      />
    </View>
  );
};

export default ExploreScreen;