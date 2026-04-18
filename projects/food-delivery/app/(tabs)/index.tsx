import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { RestaurantCard } from '@/src/components/restaurant-card';
import { CategoryCard } from '@/src/components/category-card';
import { OfferBanner } from '@/src/components/offer-banner';
import { SearchBar } from '@/src/components/search-bar';
import { useAppSelector } from '@/src/store/hooks';
import { Restaurant } from '@/src/store/slices/restaurants';
import { styles } from '@/src/styles/home';

interface Category {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface Offer {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export default function HomeScreen() {
  const restaurants = useAppSelector((state: any) => state.restaurants.featured);
  
  const categories = useMemo<Category[]>(() => [
    { id: '1', name: 'Pizza', icon: 'pizza' },
    { id: '2', name: 'Burger', icon: 'fast-food' },
    { id: '3', name: 'Sushi', icon: 'fish' },
    { id: '4', name: 'Dessert', icon: 'ice-cream' },
    { id: '5', name: 'Coffee', icon: 'cafe' },
  ], []);
  
  const offers = useMemo<Offer[]>(() => [
    { id: '1', title: '50% Off', description: 'On first order', imageUrl: 'https://example.com/offer1.jpg' },
    { id: '2', title: 'Free Delivery', description: 'Above ₹199', imageUrl: 'https://example.com/offer2.jpg' },
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
  
  const renderCategoryItem = useCallback(({ item }: { item: Category }) => (
    <CategoryCard
      category={item}
      onPress={() => handleCategoryPress(item.id)}
    />
  ), [handleCategoryPress]);
  
  const renderRestaurantItem = useCallback(({ item }: { item: Restaurant }) => (
    <RestaurantCard
      restaurant={item}
      onPress={() => handleRestaurantPress(item.id)}
    />
  ), [handleRestaurantPress]);
  
  const renderOfferItem = useCallback(({ item }: { item: Offer }) => (
    <OfferBanner offer={item} />
  ), []);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={20} color={colors.primary} />
          <Text style={styles.locationText}>Delivery to Home</Text>
          <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle" size={32} color={colors.primary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchSection}>
          <SearchBar onPress={handleSearchPress} />
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <Link href="/explore" style={styles.seeAllLink}>See All</Link>
          </View>
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
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Special Offers</Text>
            <Link href="/explore" style={styles.seeAllLink}>See All</Link>
          </View>
          <FlatList
            horizontal
            data={offers}
            renderItem={renderOfferItem}
            keyExtractor={(item: Offer) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offersList}
          />
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Restaurants</Text>
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
