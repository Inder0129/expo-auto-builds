import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector, useAppDispatch } from '@/src/store/hooks';
import { addToCart } from '@/src/store/slices/cart';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import { RestaurantHeader } from '@/src/components/restaurant/restaurant-header';
import { MenuItemCard } from '@/src/components/restaurant/menu-item-card';
import { ReviewCard } from '@/src/components/restaurant/review-card';
import { AddToCartButton } from '@/src/components/restaurant/add-to-cart-button';
import styles from '@/src/styles/restaurant-detail';

type MenuItemType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVegetarian: boolean;
  isSpicy: boolean;
};

type ReviewType = {
  id: string;
  userName: string;
  userAvatar: string;
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
  minOrder: number;
  image: string;
  address: string;
  isOpen: boolean;
};

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const restaurant = useAppSelector((state: any) => 
    state.restaurants.restaurants.find((r: RestaurantType) => r.id === id)
  );
  
  const menuItems = useAppSelector((state: any) => 
    state.restaurants.menuItems.filter((item: MenuItemType) => item.id.startsWith(id))
  );
  
  const reviews = useAppSelector((state: any) => 
    state.restaurants.reviews.filter((review: ReviewType) => review.id.startsWith(id))
  );

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(menuItems.map((item: MenuItemType) => item.category)));
    return ['All', ...uniqueCategories];
  }, [menuItems]);

  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');

  const filteredMenuItems = useMemo(() => {
    if (selectedCategory === 'All') return menuItems;
    return menuItems.filter((item: MenuItemType) => item.category === selectedCategory);
  }, [menuItems, selectedCategory]);

  const handleAddToCart = useCallback((item: MenuItemType) => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      quantity: 1,
      image: item.image,
      restaurantId: id,
      restaurantName: restaurant?.name || ''
    }));
  }, [dispatch, id, restaurant]);

  const handleViewCart = useCallback(() => {
    router.push('/(tabs)/cart');
  }, [router]);

  if (!restaurant) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Restaurant not found</Text>
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RestaurantHeader 
          name={restaurant.name}
          cuisine={restaurant.cuisine}
          rating={restaurant.rating}
          deliveryTime={restaurant.deliveryTime}
          deliveryFee={restaurant.deliveryFee}
          minOrder={restaurant.minOrder}
          image={restaurant.image}
          address={restaurant.address}
          isOpen={restaurant.isOpen}
        />

        <View style={styles.categoriesContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category: string) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menu</Text>
          {filteredMenuItems.map((item: MenuItemType) => (
            <MenuItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              category={item.category}
              isVegetarian={item.isVegetarian}
              isSpicy={item.isSpicy}
              onAddToCart={() => handleAddToCart(item)}
              onViewDetails={() => router.push(`/dish/${item.id}`)}
            />
          ))}
        </View>

        <View style={styles.reviewsSection}>
          <View style={styles.reviewsHeader}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <Text style={styles.ratingText}>
              <Ionicons name="star" size={16} color={colors.warning} />
              {' '}{restaurant.rating.toFixed(1)}
            </Text>
          </View>
          
          {reviews.slice(0, 3).map((review: ReviewType) => (
            <ReviewCard
              key={review.id}
              userName={review.userName}
              userAvatar={review.userAvatar}
              rating={review.rating}
              comment={review.comment}
              date={review.date}
            />
          ))}
          
          {reviews.length > 3 && (
            <Button 
              title="View All Reviews" 
              variant="outline" 
              style={styles.viewAllButton}
              onPress={() => Alert.alert('Coming Soon')}
            />
          )}
        </View>
      </ScrollView>

      <AddToCartButton onPress={handleViewCart} />
    </View>
  );
}
