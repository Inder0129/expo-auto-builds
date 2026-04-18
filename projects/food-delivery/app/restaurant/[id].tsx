import React, { useState, useCallback, useMemo } from 'react';
import { View, ScrollView, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { addToCart } from '@/src/store/slices/cart';
import { colors, spacing, typography } from '@/src/theme';
import { Button } from '@/src/components/ui/button';
import RestaurantHeader from '@/src/components/restaurant/restaurant-header';
import MenuItemCard from '@/src/components/restaurant/menu-item-card';
import CartFooter from '@/src/components/restaurant/cart-footer';
import FoodCategoryTabs from '@/src/components/restaurant/food-category-tabs';
import styles from '@/src/styles/restaurant-detail';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

type Category = {
  id: string;
  name: string;
};

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: any) => state.cart.items);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const restaurant = useMemo(() => ({
    id: id || '1',
    name: 'Burger Palace',
    rating: 4.5,
    deliveryTime: '20-30 min',
    deliveryFee: 2.99,
    minOrder: 15,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    address: '123 Food Street, City',
    cuisine: 'American, Burgers',
    isOpen: true,
  }), [id]);
  
  const categories: Category[] = useMemo(() => [
    { id: 'all', name: 'All' },
    { id: 'burgers', name: 'Burgers' },
    { id: 'sides', name: 'Sides' },
    { id: 'drinks', name: 'Drinks' },
    { id: 'desserts', name: 'Desserts' },
  ], []);
  
  const menuItems: MenuItem[] = useMemo(() => [
    { id: '1', name: 'Classic Burger', description: 'Beef patty, lettuce, tomato, onion, special sauce', price: 12.99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', category: 'burgers' },
    { id: '2', name: 'Cheese Burger', description: 'Double beef patty with melted cheese', price: 14.99, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9', category: 'burgers' },
    { id: '3', name: 'French Fries', description: 'Crispy golden fries with seasoning', price: 4.99, image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f', category: 'sides' },
    { id: '4', name: 'Onion Rings', description: 'Crispy battered onion rings', price: 5.99, image: 'https://images.unsplash.com/photo-1639024471285-77e78fd2030a', category: 'sides' },
    { id: '5', name: 'Cola', description: 'Refreshing cola drink', price: 2.99, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97', category: 'drinks' },
    { id: '6', name: 'Chocolate Shake', description: 'Creamy chocolate milkshake', price: 6.99, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699', category: 'drinks' },
    { id: '7', name: 'Ice Cream Sundae', description: 'Vanilla ice cream with chocolate sauce', price: 7.99, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb', category: 'desserts' },
  ], []);
  
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return menuItems;
    return menuItems.filter((item: MenuItem) => item.category === selectedCategory);
  }, [menuItems, selectedCategory]);
  
  const cartTotal = useMemo(() => {
    return cartItems.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
  }, [cartItems]);
  
  const handleAddToCart = useCallback((item: MenuItem) => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    }));
  }, [dispatch, restaurant]);
  
  const handleViewCart = useCallback(() => {
    router.push('/cart');
  }, [router]);
  
  const handleCheckout = useCallback(() => {
    router.push('/checkout');
  }, [router]);
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RestaurantHeader restaurant={restaurant} />
        
        <FoodCategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <View style={styles.menuContainer}>
          <FlatList
            data={filteredItems}
            keyExtractor={(item: MenuItem) => item.id}
            renderItem={({ item }: { item: MenuItem }) => (
              <MenuItemCard
                item={item}
                onAddToCart={() => handleAddToCart(item)}
              />
            )}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </ScrollView>
      
      {cartItems.length > 0 && (
        <CartFooter
          itemCount={cartItems.length}
          total={cartTotal}
          onViewCart={handleViewCart}
          onCheckout={handleCheckout}
        />
      )}
    </View>
  );
}
