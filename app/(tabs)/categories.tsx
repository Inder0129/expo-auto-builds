import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet } from 'react-native';
import { CategoryCard } from '@/src/components/categories/category-card';
import { FilterChips } from '@/src/components/categories/filter-chips';
import { ProductGrid } from '@/src/components/categories/product-grid';
import { colors, spacing, typography } from '@/src/theme';
import { categoriesStyles } from '@/src/styles/categories';

type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  subcategories: string[];
};

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

type FilterOption = {
  id: string;
  label: string;
};

export default function CategoriesScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const categories: Category[] = useMemo(() => [
    { id: '1', name: 'Electronics', icon: 'smartphone', color: colors.primary, subcategories: ['Phones', 'Laptops', 'Audio', 'Wearables'] },
    { id: '2', name: 'Fashion', icon: 'shopping-bag', color: colors.secondary, subcategories: ['Men', 'Women', 'Kids', 'Accessories'] },
    { id: '3', name: 'Home & Kitchen', icon: 'home', color: colors.success, subcategories: ['Furniture', 'Appliances', 'Decor', 'Cookware'] },
    { id: '4', name: 'Beauty', icon: 'heart', color: colors.warning, subcategories: ['Skincare', 'Makeup', 'Haircare', 'Fragrances'] },
    { id: '5', name: 'Sports', icon: 'activity', color: colors.info, subcategories: ['Fitness', 'Outdoor', 'Team Sports', 'Yoga'] },
    { id: '6', name: 'Books', icon: 'book', color: colors.purple, subcategories: ['Fiction', 'Non-Fiction', 'Educational', 'Children'] },
    { id: '7', name: 'Toys', icon: 'gamepad', color: colors.orange, subcategories: ['Action Figures', 'Educational', 'Outdoor', 'Board Games'] },
    { id: '8', name: 'Automotive', icon: 'car', color: colors.gray, subcategories: ['Tools', 'Accessories', 'Maintenance', 'Interior'] },
  ], []);

  const products: Product[] = useMemo(() => [
    { id: '1', name: 'Wireless Earbuds', price: 79.99, image: 'https://picsum.photos/200/200', category: '1' },
    { id: '2', name: 'Gaming Laptop', price: 1299.99, image: 'https://picsum.photos/200/201', category: '1' },
    { id: '3', name: 'Running Shoes', price: 89.99, image: 'https://picsum.photos/200/202', category: '5' },
    { id: '4', name: 'Coffee Maker', price: 149.99, image: 'https://picsum.photos/200/203', category: '3' },
    { id: '5', name: 'Novel Collection', price: 24.99, image: 'https://picsum.photos/200/204', category: '6' },
    { id: '6', name: 'Yoga Mat', price: 34.99, image: 'https://picsum.photos/200/205', category: '5' },
  ], []);

  const filterOptions: FilterOption[] = useMemo(() => [
    { id: 'all', label: 'All' },
    { id: 'popular', label: 'Popular' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'sale', label: 'On Sale' },
  ], []);

  const handleCategoryPress = useCallback((categoryId: string) => {
    console.log('Category pressed:', categoryId);
  }, []);

  const handleFilterPress = useCallback((filterId: string) => {
    setSelectedFilter(filterId);
  }, []);

  const handleProductPress = useCallback((productId: string) => {
    console.log('Product pressed:', productId);
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedFilter === 'all') return products;
    return products.filter((product: Product) => product.category === selectedFilter);
  }, [products, selectedFilter]);

  const renderCategoryItem = useCallback(({ item }: { item: Category }) => (
    <CategoryCard
      category={item}
      onPress={() => handleCategoryPress(item.id)}
      style={categoriesStyles.categoryCard}
    />
  ), [handleCategoryPress]);

  return (
    <ScrollView style={categoriesStyles.container} showsVerticalScrollIndicator={false}>
      <View style={categoriesStyles.header}>
        <Text style={categoriesStyles.title}>Categories</Text>
        <Text style={categoriesStyles.subtitle}>Browse products by category</Text>
      </View>

      <View style={categoriesStyles.section}>
        <FilterChips
          options={filterOptions}
          selectedId={selectedFilter}
          onSelect={handleFilterPress}
        />
      </View>

      <View style={categoriesStyles.section}>
        <Text style={categoriesStyles.sectionTitle}>All Categories</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item: Category) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={categoriesStyles.categoryGrid}
        />
      </View>

      <View style={categoriesStyles.section}>
        <Text style={categoriesStyles.sectionTitle}>Featured Products</Text>
        <ProductGrid
          products={filteredProducts}
          onProductPress={handleProductPress}
        />
      </View>
    </ScrollView>
  );
}
