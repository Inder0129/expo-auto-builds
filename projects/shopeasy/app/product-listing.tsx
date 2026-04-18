import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FilterModal } from '@/src/components/product-listing/filter-modal';
import { ProductGrid } from '@/src/components/product-listing/product-grid';
import { SortOptions } from '@/src/components/product-listing/sort-options';
import { Button } from '@/src/components/ui/button';
import { colors } from '@/src/theme';
import { styles } from '@/src/styles/product-listing';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  inStock: boolean;
}

type SortOption = 'relevance' | 'price-low' | 'price-high' | 'rating' | 'newest';
interface FilterState {
  minPrice: number;
  maxPrice: number;
  categories: string[];
  inStockOnly: boolean;
  rating: number;
}

export default function ProductListingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string; search?: string }>();
  const [searchQuery, setSearchQuery] = useState<string>(params.search || '');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 1000,
    categories: params.category ? [params.category] : [],
    inStockOnly: false,
    rating: 0,
  });

  const products: Product[] = useMemo(() => [
    { id: '1', name: 'Wireless Bluetooth Headphones', price: 99.99, originalPrice: 129.99, rating: 4.5, reviewCount: 128, image: 'headphones', category: 'Electronics', inStock: true },
    { id: '2', name: 'Smart Fitness Watch', price: 199.99, rating: 4.2, reviewCount: 89, image: 'watch', category: 'Electronics', inStock: true },
    { id: '3', name: 'Organic Cotton T-Shirt', price: 24.99, originalPrice: 34.99, rating: 4.7, reviewCount: 256, image: 'tshirt', category: 'Clothing', inStock: true },
    { id: '4', name: 'Stainless Steel Water Bottle', price: 29.99, rating: 4.3, reviewCount: 42, image: 'bottle', category: 'Home', inStock: false },
    { id: '5', name: 'Gaming Mouse RGB', price: 49.99, originalPrice: 69.99, rating: 4.8, reviewCount: 312, image: 'mouse', category: 'Electronics', inStock: true },
    { id: '6', name: 'Yoga Mat Premium', price: 34.99, rating: 4.4, reviewCount: 67, image: 'yogamat', category: 'Fitness', inStock: true },
    { id: '7', name: 'Coffee Maker Programmable', price: 89.99, originalPrice: 119.99, rating: 4.6, reviewCount: 189, image: 'coffeemaker', category: 'Home', inStock: true },
    { id: '8', name: 'Running Shoes Lightweight', price: 79.99, rating: 4.1, reviewCount: 93, image: 'shoes', category: 'Footwear', inStock: false },
  ], []);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product: Product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category);
      const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
      const matchesStock = !filters.inStockOnly || product.inStock;
      const matchesRating = product.rating >= filters.rating;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesStock && matchesRating;
    });

    filtered.sort((a: Product, b: Product) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': return b.id.localeCompare(a.id);
        default: return 0;
      }
    });

    return filtered;
  }, [products, searchQuery, filters, sortBy]);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleSortChange = useCallback((option: SortOption) => {
    setSortBy(option);
  }, []);

  const handleFilterApply = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setShowFilters(false);
  }, []);

  const handleProductPress = useCallback((productId: string) => {
    router.push(`/product-detail?id=${productId}`);
  }, [router]);

  const handleClearFilters = useCallback(() => {
    setFilters({
      minPrice: 0,
      maxPrice: 1000,
      categories: [],
      inStockOnly: false,
      rating: 0,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>
          {params.category ? params.category : 'Products'}
        </Text>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={colors.text.secondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor={colors.text.secondary}
        />
      </View>

      <View style={styles.controlsContainer}>
        <SortOptions selectedOption={sortBy} onSelect={handleSortChange} />
        <Button
          title="Filters"
          onPress={() => setShowFilters(true)}
          variant="outline"
          size="small"
          icon="filter-outline"
        />
      </View>

      {Object.values(filters).some((val: any) => 
        Array.isArray(val) ? val.length > 0 : 
        typeof val === 'number' ? val > 0 : 
        typeof val === 'boolean' ? val : false
      ) && (
        <View style={styles.activeFilters}>
          <Text style={styles.activeFiltersText}>Active filters</Text>
          <TouchableOpacity onPress={handleClearFilters}>
            <Text style={styles.clearFiltersText}>Clear all</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={filteredProducts}
        renderItem={({ item }: { item: Product }) => (
          <ProductGrid product={item} onPress={() => handleProductPress(item.id)} />
        )}
        keyExtractor={(item: Product) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={(
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={64} color={colors.text.secondary} />
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your filters or search</Text>
          </View>
        )}
      />

      <FilterModal
        visible={showFilters}
        filters={filters}
        onApply={handleFilterApply}
        onClose={() => setShowFilters(false)}
      />
    </SafeAreaView>
  );
}
