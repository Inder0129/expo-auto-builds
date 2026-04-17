import React, { useCallback, useMemo, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch } from '@/src/store/hooks';
import { addToCart } from '@/src/store/slices/cart';
import { RestaurantHeader } from '@/src/components/restaurant/RestaurantHeader';
import { MenuSection } from '@/src/components/restaurant/MenuSection';
import { CartFooter } from '@/src/components/restaurant/CartFooter';
import { LoadingIndicator } from '@/src/components/ui/LoadingIndicator';
import styles from '@/src/styles/restaurant';

type RestaurantDetailScreenProps = {};

export default function RestaurantDetailScreen({}: RestaurantDetailScreenProps) {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { restaurants, loading } = useAppSelector((state) => state.restaurants);
  const { items } = useAppSelector((state) => state.cart);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const restaurant = useMemo(() => {
    return restaurants.find((r) => r.id === id);
  }, [restaurants, id]);

  const cartItemsCount = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const cartTotal = useMemo(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const handleAddToCart = useCallback((menuItem: any) => {
    dispatch(addToCart({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      restaurantId: restaurant?.id || '',
      restaurantName: restaurant?.name || '',
    }));
    Alert.alert('Added to cart', `${menuItem.name} has been added to your cart`);
  }, [dispatch, restaurant]);

  const handleCheckout = useCallback(() => {
    if (cartItemsCount === 0) {
      Alert.alert('Empty cart', 'Add items to cart before checkout');
      return;
    }
    router.push('/checkout');
  }, [cartItemsCount, router]);

  const handleViewCart = useCallback(() => {
    router.push('/cart');
  }, [router]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!restaurant) {
    return (
      <View style={styles.notFoundContainer}>
        <LoadingIndicator message="Restaurant not found" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RestaurantHeader restaurant={restaurant} />
        <MenuSection
          restaurant={restaurant}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={handleAddToCart}
        />
      </ScrollView>
      <CartFooter
        itemCount={cartItemsCount}
        total={cartTotal}
        onCheckout={handleCheckout}
        onViewCart={handleViewCart}
      />
    </View>
  );
}
