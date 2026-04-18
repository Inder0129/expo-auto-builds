import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch } from '@/src/store/hooks';
import { RestaurantHeader } from '@/src/components/restaurant/restaurant-header';
import { MenuItemCard } from '@/src/components/restaurant/menu-item-card';
import { ReviewCard } from '@/src/components/restaurant/review-card';
import { AddToCartButton } from '@/src/components/restaurant/add-to-cart-button';
import { colors, spacing, typography } from '@/src/theme';
import styles from '@/src/styles/restaurant-detail';

type MenuItemType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

type ReviewType = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
};

type RestaurantType = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
};

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const restaurant = useAppSelector((state: any) => 
    state.restaurants.restaurants.find((r: RestaurantType) => r.id === id)
  );

  const menuItems: MenuItemType[] = useMemo(() => [
    { id: '1', name: 'Burger', description: 'Delicious beef burger', price: 199, image: '', category: 'Main Course' },
    { id: '2', name: 'Pizza', description: 'Cheese pizza', price: 299, image: '', category: 'Main Course' },
  ], []);

  const reviews: ReviewType[] = useMemo(() => [
    { id: '1', userName: 'John Doe', rating: 4, comment: 'Great food!', date: '2024-01-15' },
    { id: '2', userName: 'Jane Smith', rating: 5, comment: 'Excellent service', date: '2024-01-10' },
  ], []);

  const handleAddToCart = useCallback((itemId: string) => {
    const item = menuItems.find((menuItem: MenuItemType) => menuItem.id === itemId);
    if (item) {
      // Dispatch action to add to cart
      router.push('/(tabs)/cart');
    }
  }, [menuItems, router, dispatch]);

  const handleReviewPress = useCallback((reviewId: string) => {
    // Handle review press
  }, []);

  if (!restaurant) {
    return (
      <View style={styles.container}>
        <Text>Restaurant not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <RestaurantHeader restaurant={restaurant} />

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Menu</Text>
        {menuItems.map((item: MenuItemType) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onAddToCart={() => handleAddToCart(item.id)}
          />
        ))}
      </View>

      <View style={styles.reviewsSection}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        {reviews.map((review: ReviewType) => (
          <ReviewCard
            key={review.id}
            review={review}
            onPress={() => handleReviewPress(review.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
