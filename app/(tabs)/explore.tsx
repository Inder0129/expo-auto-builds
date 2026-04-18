import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image, TextInput, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { Card } from '@/src/components/ui';
import { useAppSelector } from '@/src/store/hooks';
import { RootState } from '@/src/store';
import { styles } from '@/src/styles/explore';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: number;
  priceRange: string;
  image: string;
  categoryIds: string[];
  hasOffers: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: (id: string) => void;
}

interface FilterChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
  style?: ViewStyle;
}

interface CategoryGridProps {
  categories: Category[];
  onCategoryPress: (id: string) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(restaurant.id);
  }, [restaurant.id, onPress]);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.restaurantCard}>
      <Card style={styles.restaurantCardInner}>
        <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
          <View style={styles.restaurantMeta}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color={colors.warning} />
              <Text style={styles.ratingText}>{restaurant.rating}</Text>
            </View>
            <Text style={styles.deliveryTime}>{restaurant.deliveryTime} min</Text>
            <Text style={styles.priceRange}>{restaurant.priceRange}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const FilterChip: React.FC<FilterChipProps> = ({ label, selected, onPress }) => {
  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.filterChip,
        selected && styles.filterChipSelected
      ]}
    >
      <Text style={[
        styles.filterChipText,
        selected && styles.filterChipTextSelected
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch, style }) => {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(() => {
    onSearch(query);
  }, [query, onSearch]);

  return (
    <View style={[styles.searchBar, style]}>
      <Ionicons name="search" size={20} color={colors.gray} />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
    </View>
  );
};

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onCategoryPress }) => {
  const handlePress = useCallback((id: string) => {
    onCategoryPress(id);
  }, [onCategoryPress]);

  return (
    <View style={styles.categoryGrid}>
      {categories.map((category: Category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryItem}
          onPress={() => handlePress(category.id)}
        >
          <View style={styles.categoryIconContainer}>
            <Ionicons name={category.icon as any} size={28} color={colors.primary} />
          </View>
          <Text style={styles.categoryName}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function ExploreScreen() {
  const router = useRouter();
  const restaurants = useAppSelector((state: RootState) => state.restaurants.restaurants);
  const categories = useAppSelector((state: RootState) => state.restaurants.categories);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filters = useMemo(() => [
    { id: 'rating', label: 'Top Rated' },
    { id: 'fast', label: 'Fast Delivery' },
    { id: 'offers', label: 'Offers' },
    { id: 'pureveg', label: 'Pure Veg' },
    { id: 'nonveg', label: 'Non Veg' },
  ], []);

  const filteredRestaurants = useMemo(() => {
    let result = restaurants;
    
    if (selectedCategory) {
      result = result.filter((restaurant: Restaurant) => 
        restaurant.categoryIds.includes(selectedCategory)
      );
    }

    if (selectedFilters.includes('rating')) {
      result = result.filter((restaurant: Restaurant) => restaurant.rating >= 4.0);
    }

    if (selectedFilters.includes('fast')) {
      result = result.filter((restaurant: Restaurant) => restaurant.deliveryTime <= 30);
    }

    if (selectedFilters.includes('offers')) {
      result = result.filter((restaurant: Restaurant) => restaurant.hasOffers);
    }

    return result;
  }, [restaurants, selectedCategory, selectedFilters]);

  const handleRestaurantPress = useCallback((id: string) => {
    router.push(`/restaurant/${id}`);
  }, [router]);

  const handleCategoryPress = useCallback((id: string) => {
    setSelectedCategory(id === selectedCategory ? null : id);
  }, [selectedCategory]);

  const handleFilterPress = useCallback((filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId)
        ? prev.filter((id: string) => id !== filterId)
        : [...prev, filterId]
    );
  }, []);

  const handleSearch = useCallback((query: string) => {
    router.push(`/search?q=${query}`);
  }, [router]);

  const renderRestaurantItem = useCallback(({ item }: { item: Restaurant }) => (
    <RestaurantCard restaurant={item} onPress={handleRestaurantPress} />
  ), [handleRestaurantPress]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <SearchBar 
          placeholder="Search restaurants, cuisines..." 
          onSearch={handleSearch}
          style={styles.searchBarContainer}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <CategoryGrid 
          categories={categories} 
          onCategoryPress={handleCategoryPress} 
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filters</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {filters.map((filter) => (
            <FilterChip
              key={filter.id}
              label={filter.label}
              selected={selectedFilters.includes(filter.id)}
              onPress={() => handleFilterPress(filter.id)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.resultsHeader}>
          <Text style={styles.sectionTitle}>
            {selectedCategory 
              ? categories.find((c: Category) => c.id === selectedCategory)?.name + ' Restaurants'
              : 'All Restaurants'}
          </Text>
          <Text style={styles.resultsCount}>
            {filteredRestaurants.length} results
          </Text>
        </View>

        <FlatList
          data={filteredRestaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={(item: Restaurant) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.restaurantsList}
        />
      </View>
    </ScrollView>
  );
}