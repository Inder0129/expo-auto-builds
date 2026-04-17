import React, { useCallback, useState, useMemo } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { addToCart } from '@/src/store/slices/cart';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import { RestaurantHeader } from '@/src/components/restaurant/restaurant-header';
import { MenuSection } from '@/src/components/restaurant/menu-section';
import { CartFooter } from '@/src/components/restaurant/cart-footer';
import { styles } from '@/src/styles/restaurant-detail';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
};

type Restaurant = {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
};

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: any) => state.cart.items);
  
  const [restaurant] = useState<Restaurant>({
    id: id || '1',
    name: 'The Gourmet Kitchen',
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    image: 'https://example.com/restaurant.jpg',
  });

  const [menuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Margherita Pizza', description: 'Classic tomato sauce and mozzarella', price: 12.99, category: 'Pizza' },
    { id: '2', name: 'Pepperoni Pizza', description: 'Tomato sauce, mozzarella, pepperoni', price: 14.99, category: 'Pizza' },
    { id: '3', name: 'Caesar Salad', description: 'Romaine lettuce, croutons, parmesan', price: 8.99, category: 'Salads' },
    { id: '4', name: 'Garlic Bread', description: 'Toasted bread with garlic butter', price: 4.99, category: 'Appetizers' },
    { id: '5', name: 'Chocolate Brownie', description: 'Warm brownie with ice cream', price: 6.99, category: 'Desserts' },
  ]);

  const categories = useMemo(() => {
    return Array.from(new Set(menuItems.map((item: MenuItem) => item.category)));
  }, [menuItems]);

  const handleAddToCart = useCallback((item: MenuItem) => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    }));
    Alert.alert('Added to Cart', `${item.name} added to cart`);
  }, [dispatch, restaurant]);

  const handleViewCart = useCallback(() => {
    router.push('/cart');
  }, [router]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <RestaurantHeader
          name={restaurant.name}
          rating={restaurant.rating}
          deliveryTime={restaurant.deliveryTime}
          deliveryFee={restaurant.deliveryFee}
          image={restaurant.image}
        />

        <View style={styles.menuContainer}>
          {categories.map((category: string) => (
            <MenuSection
              key={category}
              title={category}
              items={menuItems.filter((item: MenuItem) => item.category === category)}
              onAddToCart={handleAddToCart}
            />
          ))}
        </View>
      </ScrollView>

      {cartItems.length > 0 && (
        <CartFooter
          itemCount={cartItems.reduce((count: number, item: any) => count + item.quantity, 0)}
          total={cartTotal}
          onViewCart={handleViewCart}
        />
      )}
    </View>
  );
}
