import React, { useCallback, useState, useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors, spacing, typography } from '@/src/theme';
import { RestaurantHeader } from '@/src/components/restaurant/restaurant-header';
import { MenuSection } from '@/src/components/restaurant/menu-section';
import { FoodItem } from '@/src/components/restaurant/food-item';
import { CartSummary } from '@/src/components/restaurant/cart-summary';
import { Button } from '@/src/components/ui/button';
import styles from '@/src/styles/restaurant-detail';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: '1', name: 'Margherita Pizza', price: 12.99, quantity: 1 },
    { id: '2', name: 'Garlic Bread', price: 5.99, quantity: 2 },
  ]);

  const restaurant = {
    id: id || '1',
    name: 'Italian Bistro',
    rating: 4.5,
    deliveryTime: '30-40 min',
    deliveryFee: 2.99,
    minOrder: 15.00,
    address: '123 Pasta Street, Food City',
    description: 'Authentic Italian cuisine with fresh ingredients',
    imageUrl: 'https://example.com/restaurant.jpg',
  };

  const menuItems: MenuItem[] = [
    { id: '1', name: 'Margherita Pizza', description: 'Fresh tomatoes, mozzarella, basil', price: 12.99, category: 'Pizza', imageUrl: '' },
    { id: '2', name: 'Spaghetti Carbonara', description: 'Pasta with eggs, cheese, pancetta', price: 14.99, category: 'Pasta', imageUrl: '' },
    { id: '3', name: 'Tiramisu', description: 'Classic Italian dessert', price: 6.99, category: 'Dessert', imageUrl: '' },
    { id: '4', name: 'Garlic Bread', description: 'Toasted bread with garlic butter', price: 5.99, category: 'Appetizer', imageUrl: '' },
    { id: '5', name: 'Caesar Salad', description: 'Romaine lettuce, croutons, parmesan', price: 8.99, category: 'Salad', imageUrl: '' },
  ];

  const categories = useMemo(() => {
    return Array.from(new Set(menuItems.map((item: MenuItem) => item.category)));
  }, [menuItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
  }, [cartItems]);

  const handleAddToCart = useCallback((item: MenuItem) => {
    setCartItems((prev: CartItem[]) => {
      const existing = prev.find((cartItem: CartItem) => cartItem.id === item.id);
      if (existing) {
        return prev.map((cartItem: CartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  }, []);

  const handleRemoveFromCart = useCallback((itemId: string) => {
    setCartItems((prev: CartItem[]) => prev.filter((item: CartItem) => item.id !== itemId));
  }, []);

  const handleUpdateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCartItems((prev: CartItem[]) =>
      prev.map((item: CartItem) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }, [handleRemoveFromCart]);

  const handleCheckout = useCallback(() => {
    router.push('/checkout');
  }, [router]);

  const handleViewCart = useCallback(() => {
    router.push('/cart');
  }, [router]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <RestaurantHeader
          name={restaurant.name}
          rating={restaurant.rating}
          deliveryTime={restaurant.deliveryTime}
          deliveryFee={restaurant.deliveryFee}
          minOrder={restaurant.minOrder}
          address={restaurant.address}
          description={restaurant.description}
          imageUrl={restaurant.imageUrl}
        />

        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Menu</Text>
          {categories.map((category: string) => (
            <MenuSection key={category} title={category}>
              {menuItems
                .filter((item: MenuItem) => item.category === category)
                .map((item: MenuItem) => (
                  <FoodItem
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    onAddToCart={() => handleAddToCart(item)}
                  />
                ))}
            </MenuSection>
          ))}
        </View>
      </ScrollView>

      {cartItems.length > 0 && (
        <CartSummary
          itemCount={cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)}
          totalPrice={totalPrice}
          onCheckout={handleCheckout}
          onViewCart={handleViewCart}
        />
      )}
    </View>
  );
}
