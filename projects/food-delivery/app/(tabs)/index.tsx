import React, { useCallback, useMemo } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { RestaurantCard } from '@/src/components/restaurant-card';
import { CategoryCard } from '@/src/components/category-card';
import { OfferBanner } from '@/src/components/offer-banner';
import { SearchBar } from '@/src/components/search-bar';
import { homeStyles } from '@/src/styles/home';

interface Restaurant {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  cuisine: string;
  imageUrl: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
}

export default function HomeScreen() {
  const featuredRestaurants: Restaurant[] = useMemo(() => [
    { id: '1', name: 'Burger Palace', rating: 4.5, deliveryTime: '25-30 min', cuisine: 'American', imageUrl: 'https://example.com/burger.jpg' },
    { id: '2', name: 'Sushi Zen', rating: 4.8, deliveryTime: '35-40 min', cuisine: 'Japanese', imageUrl: 'https://example.com/sushi.jpg' },
    { id: '3', name: 'Pizza Heaven', rating: 4.3, deliveryTime: '20-25 min', cuisine: 'Italian', imageUrl: 'https://example.com/pizza.jpg' },
  ], []);

  const categories: Category[] = useMemo(() => [
    { id: '1', name: 'Pizza', icon: 'pizza' },
    { id: '2', name: 'Burger', icon: 'fast-food' },
    { id: '3', name: 'Sushi', icon: 'fish' },
    { id: '4', name: 'Chinese', icon: 'restaurant' },
    { id: '5', name: 'Indian', icon: 'flame' },
    { id: '6', name: 'Desserts', icon: 'ice-cream' },
  ], []);

  const offers: Offer[] = useMemo(() => [
    { id: '1', title: 'First Order', description: 'Get 50% off on your first order', code: 'FIRST50' },
    { id: '2', title: 'Weekend Special', description: '30% off on all orders above ₹500', code: 'WEEKEND30' },
  ], []);

  const handleSearch = useCallback((query: string) => {
    console.log('Search:', query);
  }, []);

  const handleRestaurantPress = useCallback((restaurantId: string) => {
    console.log('Restaurant pressed:', restaurantId);
  }, []);

  const handleCategoryPress = useCallback((categoryId: string) => {
    console.log('Category pressed:', categoryId);
  }, []);

  const handleOfferPress = useCallback((offerId: string) => {
    console.log('Offer pressed:', offerId);
  }, []);

  const renderRestaurantItem = useCallback(({ item }: { item: Restaurant }) => (
    <RestaurantCard
      restaurant={item}
      onPress={() => handleRestaurantPress(item.id)}
    />
  ), [handleRestaurantPress]);

  const renderCategoryItem = useCallback(({ item }: { item: Category }) => (
    <CategoryCard
      category={item}
      onPress={() => handleCategoryPress(item.id)}
    />
  ), [handleCategoryPress]);

  const renderOfferItem = useCallback(({ item }: { item: Offer }) => (
    <OfferBanner
      offer={item}
      onPress={() => handleOfferPress(item.id)}
    />
  ), [handleOfferPress]);

  return (
    <ScrollView style={homeStyles.container} showsVerticalScrollIndicator={false}>
      <View style={homeStyles.header}>
        <View style={homeStyles.locationContainer}>
          <Ionicons name="location" size={20} color={colors.primary} />
          <Text style={homeStyles.locationText}>Home, 123 Street</Text>
          <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
        </View>
        <TouchableOpacity style={homeStyles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <SearchBar onSearch={handleSearch} placeholder="Search for restaurants or dishes" />

      <View style={homeStyles.section}>
        <Text style={homeStyles.sectionTitle}>Categories</Text>
        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item: Category) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={homeStyles.categoriesList}
        />
      </View>

      <View style={homeStyles.section}>
        <View style={homeStyles.sectionHeader}>
          <Text style={homeStyles.sectionTitle}>Featured Restaurants</Text>
          <Link href="/(tabs)/explore" style={homeStyles.seeAllLink}>
            <Text style={homeStyles.seeAllText}>See All</Text>
          </Link>
        </View>
        <FlatList
          horizontal
          data={featuredRestaurants}
          renderItem={renderRestaurantItem}
          keyExtractor={(item: Restaurant) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={homeStyles.restaurantsList}
        />
      </View>

      <View style={homeStyles.section}>
        <View style={homeStyles.sectionHeader}>
          <Text style={homeStyles.sectionTitle}>Offers</Text>
          <Link href="/offers" style={homeStyles.seeAllLink}>
            <Text style={homeStyles.seeAllText}>See All</Text>
          </Link>
        </View>
        <FlatList
          horizontal
          data={offers}
          renderItem={renderOfferItem}
          keyExtractor={(item: Offer) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={homeStyles.offersList}
        />
      </View>
    </ScrollView>
  );
}
