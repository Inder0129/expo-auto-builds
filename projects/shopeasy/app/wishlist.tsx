import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import WishlistItem from '@/src/components/wishlist/wishlist-item';
import EmptyState from '@/src/components/wishlist/empty-state';
import { colors } from '@/src/theme';
import { wishlistStyles } from '@/src/styles/wishlist';

interface WishlistProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
}

export default function WishlistScreen() {
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState<WishlistProduct[]>([
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 89.99,
      originalPrice: 129.99,
      imageUrl: 'https://picsum.photos/200/200',
      inStock: true,
      rating: 4.5,
      reviewCount: 128,
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 199.99,
      imageUrl: 'https://picsum.photos/200/201',
      inStock: true,
      rating: 4.2,
      reviewCount: 89,
    },
    {
      id: '3',
      name: 'Premium Coffee Maker',
      price: 149.99,
      originalPrice: 199.99,
      imageUrl: 'https://picsum.photos/200/202',
      inStock: false,
      rating: 4.7,
      reviewCount: 256,
    },
  ]);

  const handleRemoveItem = useCallback((id: string) => {
    setWishlistItems((prev: WishlistProduct[]) => prev.filter((item: WishlistProduct) => item.id !== id));
  }, []);

  const handleMoveToCart = useCallback((id: string) => {
    const item = wishlistItems.find((item: WishlistProduct) => item.id === id);
    if (item) {
      handleRemoveItem(id);
      router.push('/cart');
    }
  }, [wishlistItems, handleRemoveItem, router]);

  const handleProductPress = useCallback((id: string) => {
    router.push(`/product-detail?id=${id}`);
  }, [router]);

  const handleClearAll = useCallback(() => {
    setWishlistItems([]);
  }, []);

  const renderWishlistItem = useCallback(({ item }: { item: WishlistProduct }) => (
    <WishlistItem
      product={item}
      onRemovePress={() => handleRemoveItem(item.id)}
      onMoveToCartPress={() => handleMoveToCart(item.id)}
      onProductPress={() => handleProductPress(item.id)}
    />
  ), [handleRemoveItem, handleMoveToCart, handleProductPress]);

  return (
    <SafeAreaView style={wishlistStyles.container} edges={['top']}>
      <View style={wishlistStyles.header}>
        <Text style={wishlistStyles.title}>My Wishlist</Text>
        {wishlistItems.length > 0 && (
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={wishlistStyles.clearButton}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={wishlistItems}
        renderItem={renderWishlistItem}
        keyExtractor={(item: WishlistProduct) => item.id}
        contentContainerStyle={wishlistStyles.listContainer}
        ListEmptyComponent={<EmptyState />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
