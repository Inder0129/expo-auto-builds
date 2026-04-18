import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '@/src/components/search/search-bar';
import { RestaurantCard } from '@/src/components/restaurant/restaurant-card';
import { CategoryCard } from '@/src/components/category/category-card';
import { OfferBanner } from '@/src/components/offer/offer-banner';
import { colors, spacing, typography } from '@/src/theme';
import { homeStyles } from '@/src/styles/home';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
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
    { id: '1', name: 'Burger Palace', cuisine: 'American', rating: 4.5, deliveryTime: '20-30 min', imageUrl: 'https://example.com/burger.jpg' },
    { id: '2', name: 'Sushi Zen', cuisine: 'Japanese', rating: 4.7, deliveryTime: '30-40 min', imageUrl: 'https://example.com/sushi.jpg' },
    { id: '3', name: 'Pizza Corner', cuisine: 'Italian', rating: 4.3, deliveryTime: '25-35 min', imageUrl: 'https://example.com/pizza.jpg' },
  ], []);

  const categories: Category[] = useMemo(() => [
    { id: '1', name: 'Burgers', icon: 'fast-food' },
    { id: '2', name: 'Pizza', icon: 'pizza' },
    { id: '3', name: 'Sushi', icon: 'fish' },
    { id: '4', name: 'Desserts', icon: 'ice-cream' },
  ], []);

  const offers: Offer[] = useMemo(() => [
    { id: '1', title: 'First Order', description: 'Get 50% off on your first order', code: 'FIRST50' },
    { id: '2', title: 'Weekend Special', description: '30% off on all orders above $30', code: 'WEEKEND30' },
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

  return (
    <SafeAreaView style={homeStyles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={homeStyles.header}>
          <Text style={homeStyles.title}>Good morning, User!</Text>
          <Text style={homeStyles.subtitle}>What would you like to eat today?</Text>
        </View>

        <View style={homeStyles.searchContainer}>
          <SearchBar onSearch={handleSearch} placeholder="Search restaurants or dishes" />
        </View>

        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionTitle}>Categories</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            keyExtractor={(item: Category) => item.id}
            renderItem={({ item }: { item: Category }) => (
              <CategoryCard
                category={item}
                onPress={() => handleCategoryPress(item.id)}
              />
            )}
            contentContainerStyle={homeStyles.categoryList}
          />
        </View>

        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionTitle}>Special Offers</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={offers}
            keyExtractor={(item: Offer) => item.id}
            renderItem={({ item }: { item: Offer }) => (
              <OfferBanner
                offer={item}
                onPress={() => handleOfferPress(item.id)}
              />
            )}
            contentContainerStyle={homeStyles.offerList}
          />
        </View>

        <View style={homeStyles.section}>
          <Text style={homeStyles.sectionTitle}>Featured Restaurants</Text>
          {featuredRestaurants.map((restaurant: Restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onPress={() => handleRestaurantPress(restaurant.id)}
              style={homeStyles.restaurantCard}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
