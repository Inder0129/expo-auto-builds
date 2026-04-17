import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, Text, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import LocationHeader from '@/src/components/home/LocationHeader';
import OffersCarousel from '@/src/components/home/OffersCarousel';
import RestaurantCategories from '@/src/components/home/RestaurantCategories';
import FeaturedRestaurants from '@/src/components/home/FeaturedRestaurants';
import { useAppSelector } from '@/src/store/hooks';
import { selectRestaurants } from '@/src/store/slices/restaurants';
import { selectUserLocation } from '@/src/store/slices/auth';
import styles from '@/src/styles/home';

export default function HomeScreen() {
  const restaurants = useAppSelector(selectRestaurants);
  const userLocation = useAppSelector(selectUserLocation);

  const featuredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant => restaurant.isFeatured).slice(0, 10);
  }, [restaurants]);

  const handleLocationPress = useCallback(() => {
    // Navigate to location selection
  }, []);

  const handleOfferPress = useCallback((offerId: string) => {
    // Handle offer press
  }, []);

  const handleCategoryPress = useCallback((categoryId: string) => {
    // Navigate to category screen
  }, []);

  const handleRestaurantPress = useCallback((restaurantId: string) => {
    // Navigate to restaurant detail
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LocationHeader
          location={userLocation}
          onPress={handleLocationPress}
        />
        <OffersCarousel onOfferPress={handleOfferPress} />
        <RestaurantCategories onCategoryPress={handleCategoryPress} />
        <FeaturedRestaurants
          restaurants={featuredRestaurants}
          onRestaurantPress={handleRestaurantPress}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
