import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { HeroBanner } from '@/src/components/home/hero-banner';
import { CategoryGrid } from '@/src/components/home/category-grid';
import { RestaurantList } from '@/src/components/home/restaurant-list';
import { OfferCarousel } from '@/src/components/home/offer-carousel';
import { styles } from '@/src/styles/home';

type Restaurant = {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  cuisine: string;
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
    { id: '1', name: 'Burger Palace', rating: 4.5, deliveryTime: '20-30 min', cuisine: 'American', imageUrl: 'https://example.com/burger.jpg' },
    { id: '2', name: 'Pizza Corner', rating: 4.2, deliveryTime: '25-35 min', cuisine: 'Italian', imageUrl: 'https://example.com/pizza.jpg' },
    { id: '3', name: 'Sushi World', rating: 4.7, deliveryTime: '30-40 min', cuisine: 'Japanese', imageUrl: 'https://example.com/sushi.jpg' },
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
    { id: '2', title: 'Weekend Special', description: '30% off on all orders above $20', code: 'WEEKEND30' },
    { id: '3', title: 'Free Delivery', description: 'Free delivery on orders above $15', code: 'FREEDEL' },
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
        title="Delicious Food Delivered" 
        subtitle="Order from your favorite restaurants" 
        onPress={() => console.log('Hero banner pressed')} 
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
          <Link href="/explore" style={styles.seeAllLink}>
            <Text style={styles.seeAllText}>See All</Text>
          </Link>
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
