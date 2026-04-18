import React, { useCallback, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, SectionList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { addToCart } from '@/src/store/slices/cart';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import { RestaurantHeader } from '@/src/components/restaurant/restaurant-header';
import { MenuItemCard } from '@/src/components/restaurant/menu-item-card';
import { ReviewCard } from '@/src/components/restaurant/review-card';
import { AddToCartButton } from '@/src/components/restaurant/add-to-cart-button';
import styles from '@/src/styles/restaurant-detail';

type MenuSection = {
  title: string;
  data: MenuItemType[];
};

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

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const restaurant = useAppSelector((state: any) => 
    state.restaurants.restaurants.find((r: any) => r.id === id)
  );
  
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItemType | null>(null);

  const menuSections: MenuSection[] = [
    {
      title: 'Popular',
      data: [
        { id: '1', name: 'Chicken Biryani', description: 'Fragrant basmati rice cooked with tender chicken and spices', price: 12.99, image: '', category: 'Main Course' },
        { id: '2', name: 'Butter Chicken', description: 'Creamy tomato curry with tender chicken pieces', price: 14.99, image: '', category: 'Main Course' },
      ]
    },
    {
      title: 'Appetizers',
      data: [
        { id: '3', name: 'Samosa', description: 'Crispy pastry filled with spiced potatoes and peas', price: 4.99, image: '', category: 'Appetizer' },
        { id: '4', name: 'Paneer Tikka', description: 'Grilled cottage cheese cubes marinated in spices', price: 8.99, image: '', category: 'Appetizer' },
      ]
    }
  ];

  const reviews: ReviewType[] = [
    { id: '1', userName: 'John D.', rating: 5, comment: 'Amazing food and quick delivery!', date: '2024-01-15' },
    { id: '2', userName: 'Sarah M.', rating: 4, comment: 'Good quality, will order again.', date: '2024-01-10' },
  ];

  const handleAddToCart = useCallback((item: MenuItemType) => {
    setSelectedMenuItem(item);
  }, []);

  const handleConfirmAddToCart = useCallback((quantity: number) => {
    if (selectedMenuItem) {
      dispatch(addToCart({
        ...selectedMenuItem,
        quantity,
        restaurantId: id,
        restaurantName: restaurant?.name || 'Restaurant'
      }));
      setSelectedMenuItem(null);
    }
  }, [selectedMenuItem, dispatch, id, restaurant]);

  const handleViewCart = useCallback(() => {
    router.push('/(tabs)/cart');
  }, [router]);

  if (!restaurant) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Restaurant not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RestaurantHeader 
          name={restaurant.name}
          rating={restaurant.rating}
          cuisine={restaurant.cuisine}
          deliveryTime={restaurant.deliveryTime}
          deliveryFee={restaurant.deliveryFee}
          image={restaurant.image}
        />
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Menu</Text>
          <SectionList
            sections={menuSections}
            keyExtractor={(item: MenuItemType) => item.id}
            renderItem={({ item }: { item: MenuItemType }) => (
              <MenuItemCard 
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                onAddToCart={() => handleAddToCart(item)}
              />
            )}
            renderSectionHeader={({ section }: { section: MenuSection }) => (
              <Text style={styles.menuSectionTitle}>{section.title}</Text>
            )}
            scrollEnabled={false}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {reviews.map((review: ReviewType) => (
            <ReviewCard 
              key={review.id}
              userName={review.userName}
              rating={review.rating}
              comment={review.comment}
              date={review.date}
            />
          ))}
        </View>
      </ScrollView>
      
      <AddToCartButton 
        item={selectedMenuItem}
        onConfirm={handleConfirmAddToCart}
        onCancel={() => setSelectedMenuItem(null)}
        onViewCart={handleViewCart}
      />
    </View>
  );
}
