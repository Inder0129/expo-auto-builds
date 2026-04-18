import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { Button } from '@/src/components/ui';
import { RestaurantCard } from '@/src/components/restaurant-card';
import { CategoryCard } from '@/src/components/category-card';
import { OfferBanner } from '@/src/components/offer-banner';
import { SearchBar } from '@/src/components/search-bar';
import { useAppSelector } from '@/src/store/hooks';
import { Restaurant } from '@/src/store/slices/restaurants';
import { Category } from '@/src/constants';
import { styles } from '@/src/styles/home';

interface HomeScreenProps {}

type Offer = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export default function HomeScreen(props: HomeScreenProps) {
  const restaurants = useAppSelector((state: any) => state.restaurants.featured);
  const categories = useAppSelector((state: any) => state.restaurants.categories);
  
  const offers: Offer[] = useMemo(() => [
    { id: '1', title: '50% Off', description: 'On first order', imageUrl: 'https://example.com/offer1.jpg' },
    { id: '2', title: 'Free Delivery', description: 'Above ₹199', imageUrl: 'https://example.com/offer2.jpg' },
    { id: '3', title: 'Buy 1 Get 1', description: 'On selected items', imageUrl: 'https://example.com/offer3.jpg' },
  ], []);
  
  const handleSearchPress = useCallback(() => {
    // Navigate to search screen
  }, []);
  
  const handleCategoryPress = useCallback((categoryId: string) => {
    // Handle category selection
  }, []);
  
  const handleRestaurantPress = useCallback((restaurantId: string) => {
    // Navigate to restaurant detail
  }, []);
  
  const renderRestaurantItem = useCallback(({ item }: { item: Restaurant }) => (
    <RestaurantCard
      restaurant={item}
      onPress={() => handleRestaurantPress(item.id)}
      style={styles.restaurantCard}
    />
  ), [handleRestaurantPress]);
  
  const renderCategoryItem = useCallback(({ item }: { item: Category }) => (
    <CategoryCard
      category={item}
      onPress={() => handleCategoryPress(item.id)}
      style={styles.categoryCard}
    />
  ), [handleCategoryPress]);
  
  const renderOfferItem = useCallback(({ item }: { item: Offer }) => (
    <OfferBanner
      offer={item}
      style={styles.offerBanner}
    />
  ), []);
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color={colors.primary} />
          <Text style={styles.locationText}>Delivery to Home</Text>
          <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <SearchBar
        placeholder="Search restaurants or dishes"
        onPress={handleSearchPress}
        style={styles.searchBar}
      />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item: Category) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Offers</Text>
        <FlatList
          horizontal
          data={offers}
          renderItem={renderOfferItem}
          keyExtractor={(item: Offer) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.offerList}
        />
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Restaurants</Text>
          <Link href="/(tabs)/explore" asChild>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <FlatList
          data={restaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={(item: Restaurant) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.restaurantList}
        />
      </View>
    </ScrollView>
  );
}
