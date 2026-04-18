import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { Button } from '@/src/components/ui';
import { Card } from '@/src/components/ui';
import { useAppSelector } from '@/src/store/hooks';
import { Restaurant } from '@/src/store/slices/restaurants';
import { Category } from '@/src/constants';
import { styles } from '@/src/styles/home';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: (id: string) => void;
}

interface CategoryCardProps {
  category: Category;
  onPress: (id: string) => void;
}

interface OfferBannerProps {
  title: string;
  description: string;
  discount: string;
  onPress: () => void;
}

interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
  style?: ViewStyle;
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
          <View style={styles.restaurantRating}>
            <Ionicons name="star" size={16} color={colors.warning} />
            <Text style={styles.ratingText}>{restaurant.rating}</Text>
            <Text style={styles.deliveryTime}>{restaurant.deliveryTime} min</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(category.id);
  }, [category.id, onPress]);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.categoryCard}>
      <View style={styles.categoryIconContainer}>
        <Ionicons name={category.icon as any} size={24} color={colors.primary} />
      </View>
      <Text style={styles.categoryName}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const OfferBanner: React.FC<OfferBannerProps> = ({ title, description, discount, onPress }) => {
  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.offerBanner}>
      <View style={styles.offerContent}>
        <Text style={styles.offerTitle}>{title}</Text>
        <Text style={styles.offerDescription}>{description}</Text>
        <Text style={styles.offerDiscount}>{discount}</Text>
      </View>
      <Ionicons name="arrow-forward" size={24} color={colors.white} />
    </TouchableOpacity>
  );
};

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch, style }) => {
  const [query, setQuery] = React.useState('');

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

export default function HomeScreen() {
  const restaurants = useAppSelector((state: RootState) => state.restaurants.featured);
  const categories = useAppSelector((state: RootState) => state.restaurants.categories);
  const router = useRouter();

  const featuredRestaurants = useMemo(() => {
    return restaurants.slice(0, 5);
  }, [restaurants]);

  const handleRestaurantPress = useCallback((id: string) => {
    router.push(`/restaurant/${id}`);
  }, [router]);

  const handleCategoryPress = useCallback((id: string) => {
    router.push(`/explore?category=${id}`);
  }, [router]);

  const handleOfferPress = useCallback(() => {
    router.push('/explore');
  }, [router]);

  const handleSearch = useCallback((query: string) => {
    router.push(`/search?q=${query}`);
  }, [router]);

  const renderRestaurantItem = useCallback(({ item }: { item: Restaurant }) => (
    <RestaurantCard restaurant={item} onPress={handleRestaurantPress} />
  ), [handleRestaurantPress]);

  const renderCategoryItem = useCallback(({ item }: { item: Category }) => (
    <CategoryCard category={item} onPress={handleCategoryPress} />
  ), [handleCategoryPress]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning!</Text>
        <Text style={styles.location}>
          <Ionicons name="location" size={16} color={colors.primary} />
          {' '}Current Location
        </Text>
      </View>

      <SearchBar 
        placeholder="Search for restaurants or dishes" 
        onSearch={handleSearch}
        style={styles.searchBarContainer}
      />

      <OfferBanner
        title="Special Offer"
        description="Get 50% off on first order"
        discount="50% OFF"
        onPress={handleOfferPress}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item: Category) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Restaurants</Text>
        <FlatList
          horizontal
          data={featuredRestaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={(item: Restaurant) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.restaurantsList}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Near You</Text>
        {restaurants.map((restaurant: Restaurant) => (
          <RestaurantCard 
            key={restaurant.id} 
            restaurant={restaurant} 
            onPress={handleRestaurantPress} 
          />
        ))}
      </View>
    </ScrollView>
  );
}