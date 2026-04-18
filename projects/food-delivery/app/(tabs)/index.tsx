import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, Text, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { HeroBanner } from '@/src/components/home/hero-banner';
import { CategoryGrid } from '@/src/components/home/category-grid';
import { RestaurantList } from '@/src/components/home/restaurant-list';
import { OfferCarousel } from '@/src/components/home/offer-carousel';
import { styles } from '@/src/styles/home';
import { colors } from '@/src/theme';

type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  imageUrl: string;
};

type Category = {
  id: string;
  name: string;
  icon: string;
};

type Offer = {
  id: string;
  title: string;
  description: string;
  code: string;
};

export default function HomeScreen() {
  const featuredRestaurants: Restaurant[] = useMemo(() => [
    { id: '1', name: 'Burger Palace', cuisine: 'American', rating: 4.5, deliveryTime: '20-30 min', imageUrl: 'https://example.com/burger.jpg' },
    { id: '2', name: 'Pizza Heaven', cuisine: 'Italian', rating: 4.7, deliveryTime: '25-35 min', imageUrl: 'https://example.com/pizza.jpg' },
    { id: '3', name: 'Sushi Zen', cuisine: 'Japanese', rating: 4.8, deliveryTime: '30-40 min', imageUrl: 'https://example.com/sushi.jpg' },
  ], []);

  const categories: Category[] = useMemo(() => [
    { id: '1', name: 'Burgers', icon: 'fast-food' },
    { id: '2', name: 'Pizza', icon: 'pizza' },
    { id: '3', name: 'Sushi', icon: 'fish' },
    { id: '4', name: 'Desserts', icon: 'ice-cream' },
    { id: '5', name: 'Indian', icon: 'restaurant' },
    { id: '6', name: 'Chinese', icon: 'bowl' },
  ], []);

  const offers: Offer[] = useMemo(() => [
    { id: '1', title: 'First Order', description: 'Get 50% off on your first order', code: 'FIRST50' },
    { id: '2', title: 'Weekend Special', description: 'Flat ₹100 off on orders above ₹500', code: 'WEEKEND100' },
    { id: '3', title: 'Free Delivery', description: 'Free delivery on all orders today', code: 'FREEDEL' },
  ], []);

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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HeroBanner
        title="Delicious food delivered to your doorstep"
        subtitle="Order from 1000+ restaurants"
        imageUrl="https://example.com/hero.jpg"
      />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <CategoryGrid
          categories={categories}
          onCategoryPress={handleCategoryPress}
        />
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Restaurants</Text>
          <Link href="/explore" style={styles.seeAllLink}>See All</Link>
        </View>
        <RestaurantList
          restaurants={featuredRestaurants}
          onRestaurantPress={handleRestaurantPress}
        />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Offers</Text>
        <OfferCarousel
          offers={offers}
          onOfferPress={handleOfferPress}
        />
      </View>
    </ScrollView>
  );
}
