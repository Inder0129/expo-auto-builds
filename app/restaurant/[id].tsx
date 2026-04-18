import React, { useCallback, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, SectionList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { RestaurantHeader } from '@/src/components/restaurant/restaurant-header';
import { MenuItemCard } from '@/src/components/restaurant/menu-item-card';
import { ReviewCard } from '@/src/components/restaurant/review-card';
import { AddToCartButton } from '@/src/components/restaurant/add-to-cart-button';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';
import { styles } from '@/src/styles/restaurant-detail';

type MenuSectionType = {
  title: string;
  data: MenuItemType[];
};

type MenuItemType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
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
  minOrder: number;
  image: string;
  address: string;
  isOpen: boolean;
};

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  
  const restaurant: RestaurantType = {
    id: id || '1',
    name: 'Burger Palace',
    cuisine: 'American, Fast Food',
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    minOrder: 15,
    image: 'https://example.com/restaurant.jpg',
    address: '123 Food Street, City, State 12345',
    isOpen: true,
  };
  
  const menuSections: MenuSectionType[] = [
    {
      title: 'Popular',
      data: [
        { id: '1', name: 'Classic Burger', description: 'Beef patty with lettuce, tomato, onion, and special sauce', price: 12.99, image: 'https://example.com/burger.jpg', isVegetarian: false },
        { id: '2', name: 'Veggie Burger', description: 'Plant-based patty with fresh vegetables', price: 11.99, image: 'https://example.com/veggie-burger.jpg', isVegetarian: true },
      ],
    },
    {
      title: 'Burgers',
      data: [
        { id: '3', name: 'Cheese Burger', description: 'Double cheese with bacon', price: 14.99, image: 'https://example.com/cheese-burger.jpg', isVegetarian: false },
        { id: '4', name: 'Spicy Burger', description: 'Extra spicy with jalapeños', price: 13.99, image: 'https://example.com/spicy-burger.jpg', isSpicy: true },
      ],
    },
  ];
  
  const reviews: ReviewType[] = [
    { id: '1', userName: 'John D.', rating: 5, comment: 'Best burgers in town!', date: '2024-01-15' },
    { id: '2', userName: 'Sarah M.', rating: 4, comment: 'Great food, fast delivery', date: '2024-01-10' },
  ];
  
  const handleMenuItemPress = useCallback((item: MenuItemType) => {
    setSelectedItem(item);
  }, []);
  
  const handleAddToCart = useCallback((item: MenuItemType, quantity: number) => {
    // Dispatch action to add item to cart
    setSelectedItem(null);
  }, []);
  
  const handleCloseAddToCart = useCallback(() => {
    setSelectedItem(null);
  }, []);
  
  const renderMenuItem = useCallback(({ item }: { item: MenuItemType }) => (
    <MenuItemCard
      key={item.id}
      name={item.name}
      description={item.description}
      price={item.price}
      image={item.image}
      isVegetarian={item.isVegetarian}
      isSpicy={item.isSpicy}
      onPress={() => handleMenuItemPress(item)}
    />
  ), [handleMenuItemPress]);
  
  const renderSectionHeader = useCallback(({ section }: { section: MenuSectionType }) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  ), []);
  
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
        
        <SectionList
          sections={menuSections}
          keyExtractor={(item: MenuItemType) => item.id}
          renderItem={renderMenuItem}
          renderSectionHeader={renderSectionHeader}
          scrollEnabled={false}
          contentContainerStyle={styles.menuContainer}
        />
        
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Reviews ({reviews.length})</Text>
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
      
      {selectedItem && (
        <AddToCartButton
          item={selectedItem}
          onAddToCart={handleAddToCart}
          onClose={handleCloseAddToCart}
        />
      )}
    </View>
  );
}
