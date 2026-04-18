import React, { useCallback, useState, useMemo } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { MenuItemCard } from '@/src/components/restaurant/menu-item-card';
import { CartSummary } from '@/src/components/restaurant/cart-summary';
import { QuantitySelector } from '@/src/components/restaurant/quantity-selector';
import { styles } from '@/src/styles/restaurant-detail';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
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

  const menuItems: MenuItem[] = useMemo(() => [
    {
      id: '1',
      name: 'Margherita Pizza',
      description: 'Classic pizza with tomato sauce, mozzarella, and basil',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
      category: 'Pizza',
    },
    {
      id: '2',
      name: 'Pepperoni Pizza',
      description: 'Pizza with pepperoni and mozzarella cheese',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e',
      category: 'Pizza',
    },
    {
      id: '3',
      name: 'Garlic Bread',
      description: 'Toasted bread with garlic butter and herbs',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c',
      category: 'Appetizers',
    },
    {
      id: '4',
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with Caesar dressing and croutons',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1',
      category: 'Salads',
    },
  ], []);

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

  const handleQuantityChange = useCallback((itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems((prev: CartItem[]) => prev.filter((item: CartItem) => item.id !== itemId));
    } else {
      setCartItems((prev: CartItem[]) =>
        prev.map((item: CartItem) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  }, []);

  const handleCheckout = useCallback(() => {
    router.push('/cart');
  }, [router]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.restaurantName}>Pizza Palace</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1513104890138-7c749659a591' }}
          style={styles.restaurantImage}
        />

        <View style={styles.restaurantInfo}>
          <Text style={styles.cuisine}>Italian • Pizza • $$</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>4.5 (1.2k reviews)</Text>
          </View>
          <Text style={styles.deliveryTime}>Delivery: 25-35 min</Text>
          <Text style={styles.address}>123 Pizza Street, New York, NY</Text>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Menu</Text>
          {menuItems.map((item: MenuItem) => (
            <MenuItemCard
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              onAddToCart={() => handleAddToCart(item)}
              style={styles.menuItem}
            />
          ))}
        </View>
      </ScrollView>

      {cartItems.length > 0 && (
        <CartSummary
          itemCount={cartItems.length}
          totalPrice={totalPrice}
          onCheckout={handleCheckout}
          style={styles.cartSummary}
        />
      )}

      {cartItems.map((item: CartItem) => (
        <View key={item.id} style={styles.cartItemOverlay}>
          <Text style={styles.cartItemName}>{item.name}</Text>
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => handleQuantityChange(item.id, item.quantity + 1)}
            onDecrease={() => handleQuantityChange(item.id, item.quantity - 1)}
          />
        </View>
      ))}
    </SafeAreaView>
  );
}