import React, { useCallback, useMemo } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { HeroBanner } from '@/src/components/home/hero-banner';
import { CategoryGrid } from '@/src/components/home/category-grid';
import { ProductCard } from '@/src/components/home/product-card';
import { DealTimer } from '@/src/components/home/deal-timer';
import { Button } from '@/src/components/ui/button';
import { colors, spacing, typography } from '@/src/theme';
import { homeStyles } from '@/src/styles/home';

type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  isFavorite: boolean;
};

type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export default function HomeScreen() {
  const featuredProducts: Product[] = useMemo(() => [
    { id: '1', name: 'Wireless Headphones', price: 89.99, originalPrice: 129.99, image: 'https://picsum.photos/200/200', rating: 4.5, isFavorite: true },
    { id: '2', name: 'Smart Watch Series 5', price: 299.99, image: 'https://picsum.photos/200/201', rating: 4.8, isFavorite: false },
    { id: '3', name: 'Organic Cotton T-Shirt', price: 24.99, image: 'https://picsum.photos/200/202', rating: 4.2, isFavorite: true },
    { id: '4', name: 'Bluetooth Speaker', price: 59.99, originalPrice: 79.99, image: 'https://picsum.photos/200/203', rating: 4.3, isFavorite: false },
  ], []);

  const categories: Category[] = useMemo(() => [
    { id: '1', name: 'Electronics', icon: 'smartphone', color: colors.primary },
    { id: '2', name: 'Fashion', icon: 'shopping-bag', color: colors.secondary },
    { id: '3', name: 'Home', icon: 'home', color: colors.success },
    { id: '4', name: 'Beauty', icon: 'heart', color: colors.warning },
    { id: '5', name: 'Sports', icon: 'activity', color: colors.info },
    { id: '6', name: 'Books', icon: 'book', color: colors.purple },
  ], []);

  const handleViewAllProducts = useCallback(() => {
    console.log('View all products');
  }, []);

  const handleProductPress = useCallback((productId: string) => {
    console.log('Product pressed:', productId);
  }, []);

  const handleCategoryPress = useCallback((categoryId: string) => {
    console.log('Category pressed:', categoryId);
  }, []);

  const renderProductItem = useCallback(({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={() => handleProductPress(item.id)}
      style={homeStyles.productCard}
    />
  ), [handleProductPress]);

  return (
    <ScrollView style={homeStyles.container} showsVerticalScrollIndicator={false}>
      <HeroBanner
        title="Summer Sale"
        subtitle="Up to 50% off on selected items"
        image="https://picsum.photos/400/200"
        onPress={() => console.log('Banner pressed')}
      />

      <View style={homeStyles.section}>
        <View style={homeStyles.sectionHeader}>
          <Text style={homeStyles.sectionTitle}>Shop by Category</Text>
          <Link href="/categories" style={homeStyles.viewAllLink}>
            <Text style={homeStyles.viewAllText}>View All</Text>
          </Link>
        </View>
        <CategoryGrid
          categories={categories}
          onCategoryPress={handleCategoryPress}
        />
      </View>

      <View style={homeStyles.section}>
        <View style={homeStyles.sectionHeader}>
          <Text style={homeStyles.sectionTitle}>Flash Deals</Text>
          <DealTimer endTime={Date.now() + 86400000} />
        </View>
        <FlatList
          data={featuredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item: Product) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={homeStyles.productList}
        />
      </View>

      <View style={homeStyles.section}>
        <View style={homeStyles.sectionHeader}>
          <Text style={homeStyles.sectionTitle}>Recommended For You</Text>
          <Button
            title="View All"
            variant="text"
            onPress={handleViewAllProducts}
            style={homeStyles.viewAllButton}
          />
        </View>
        <FlatList
          data={featuredProducts.slice(0, 2)}
          renderItem={renderProductItem}
          keyExtractor={(item: Product) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={homeStyles.productList}
        />
      </View>
    </ScrollView>
  );
}
