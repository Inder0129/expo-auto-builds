import React, { useCallback } from 'react';
import { View, ScrollView, Text, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { RestaurantHeader } from '@/src/components/restaurant/restaurant-header';
import { MenuSection } from '@/src/components/restaurant/menu-section';
import { FoodItem } from '@/src/components/restaurant/food-item';
import { ReviewCard } from '@/src/components/restaurant/review-card';
import { AddToCartButton } from '@/src/components/restaurant/add-to-cart-button';
import { styles } from '@/src/styles/restaurant-detail';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
};

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const restaurant = {
    id: id || '1',
    name: 'Pizza Palace',
    rating: 4.5,
    deliveryTime: '30-40 min',
    deliveryFee: '$2.99',
    cuisine: 'Italian, Pizza',
    address: '123 Main St, City, State 12345',
    image: '',
  };

  const menuItems: MenuItem[] = [
    { id: '1', name: 'Margherita Pizza', description: 'Classic pizza with tomato sauce and mozzarella', price: 12.99, image: '', category: 'Pizza' },
    { id: '2', name: 'Pepperoni Pizza', description: 'Pizza with pepperoni and cheese', price: 14.99, image: '', category: 'Pizza' },
    { id: '3', name: 'Garlic Bread', description: 'Freshly baked garlic bread', price: 4.99, image: '', category: 'Appetizers' },
    { id: '4', name: 'Caesar Salad', description: 'Fresh salad with Caesar dressing', price: 8.99, image: '', category: 'Salads' },
  ];

  const reviews: Review[] = [
    { id: '1', userName: 'John Doe', rating: 5, comment: 'Great pizza! Fast delivery.', date: '2024-01-15' },
    { id: '2', userName: 'Jane Smith', rating: 4, comment: 'Good food, reasonable prices.', date: '2024-01-10' },
  ];

  const categories = Array.from(new Set(menuItems.map((item: MenuItem) => item.category)));

  const handleAddToCart = useCallback((itemId: string) => {
    console.log('Add to cart:', itemId);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RestaurantHeader
          name={restaurant.name}
          rating={restaurant.rating}
          deliveryTime={restaurant.deliveryTime}
          deliveryFee={restaurant.deliveryFee}
          cuisine={restaurant.cuisine}
          address={restaurant.address}
          image={restaurant.image}
        />

        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>Menu</Text>
          {categories.map((category: string) => (
            <MenuSection key={category} title={category}>
              {menuItems
                .filter((item: MenuItem) => item.category === category)
                .map((item: MenuItem) => (
                  <FoodItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    image={item.image}
                    onAddToCart={() => handleAddToCart(item.id)}
                  />
                ))}
            </MenuSection>
          ))}
        </View>

        <View style={styles.reviewsContainer}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          {reviews.map((review: Review) => (
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

      <View style={styles.cartButtonContainer}>
        <AddToCartButton itemCount={3} onPress={() => console.log('View cart')} />
      </View>
    </SafeAreaView>
  );
}
