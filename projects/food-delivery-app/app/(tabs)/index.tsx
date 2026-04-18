import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';
import { Button } from '@/src/components/ui';
import { Card } from '@/src/components/ui';
import { useAppSelector } from '@/src/store/hooks';
import { Restaurant } from '@/src/types/restaurant';
import { Category } from '@/src/types/category';
import { Offer } from '@/src/types/offer';
import { HeroBanner } from '@/src/components/home/hero-banner';
import { CategoryGrid } from '@/src/components/home/category-grid';
import { RestaurantList } from '@/src/components/home/restaurant-list';
import { OfferCarousel } from '@/src/components/home/offer-carousel';
import { styles } from '@/src/styles/home';

type HomeScreenProps = {};

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const user = useAppSelector((state: any) => state.auth.user);
  
  const featuredRestaurants: Restaurant[] = useMemo(() => [
    {
      id: '1',
      name: 'Burger Palace',
      cuisine: 'American',
      rating: 4.5,
      deliveryTime: '20-30 min',
      imageUrl: 'https://example.com/burger.jpg',
      isOpen: true,
      distance: '1.2 km'
    },
    {
      id: '2',
      name: 'Pizza Heaven',
      cuisine: 'Italian',
      rating: 4.7,
      deliveryTime: '25-35 min',
      imageUrl: 'https://example.com/pizza.jpg',
      isOpen: true,
      distance: '2.5 km'
    }
  ], []);
  
  const categories: Category[] = useMemo(() => [
    { id: '1', name: 'Burgers', icon: 'fast-food-outline' },
    { id: '2', name: 'Pizza', icon: 'pizza-outline' },
    { id: '3', name: 'Sushi', icon: 'fish-outline' },
    { id: '4', name: 'Desserts', icon: 'ice-cream-outline' }
  ], []);
  
  const offers: Offer[] = useMemo(() => [
    { id: '1', title: '50% Off', description: 'On first order', code: 'FIRST50' },
    { id: '2', title: 'Free Delivery', description: 'Above ₹199', code: 'FREEDEL' }
  ], []);
  
  const handleRestaurantPress = useCallback((restaurantId: string) => {
    console.log('Navigate to restaurant:', restaurantId);
  }, []);
  
  const handleCategoryPress = useCallback((categoryId: string) => {
    console.log('Category pressed:', categoryId);
  }, []);
  
  const handleOfferPress = useCallback((offerId: string) => {
    console.log('Offer pressed:', offerId);
  }, []);
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color={colors.primary} />
          <Text style={styles.locationText}>Delivering to Home</Text>
          <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
      
      <HeroBanner 
        title="Hungry?" 
        subtitle="Order food from your favorite restaurants" 
        imageUrl="https://example.com/hero.jpg" 
        onPress={() => console.log('Hero pressed')} 
      />
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Link href="/explore" style={styles.seeAllLink}>
            <Text style={styles.seeAllText}>See All</Text>
          </Link>
        </View>
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
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Offers</Text>
          <Link href="/offers" style={styles.seeAllLink}>
            <Text style={styles.seeAllText}>See All</Text>
          </Link>
        </View>
        <OfferCarousel 
          offers={offers} 
          onOfferPress={handleOfferPress} 
        />
      </View>
      
      <View style={styles.section}>
        <Card style={styles.promoCard}>
          <View style={styles.promoContent}>
            <View style={styles.promoTextContainer}>
              <Text style={styles.promoTitle}>Get 20% Cashback</Text>
              <Text style={styles.promoDescription}>On your first order with our app</Text>
              <Button 
                title="Order Now" 
                onPress={() => console.log('Promo pressed')} 
                variant="primary" 
                size="small" 
                style={styles.promoButton} 
              />
            </View>
            <Image 
              source={{ uri: 'https://example.com/promo.jpg' }} 
              style={styles.promoImage} 
            />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;