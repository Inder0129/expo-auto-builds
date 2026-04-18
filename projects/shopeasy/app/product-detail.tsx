import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/src/components/ui';
import { ImageCarousel } from '@/src/components/product-detail/image-carousel';
import { VariantSelector } from '@/src/components/product-detail/variant-selector';
import { ReviewCard } from '@/src/components/product-detail/review-card';
import { QuantitySelector } from '@/src/components/product-detail/quantity-selector';
import { colors, spacing, typography } from '@/src/theme';
import { productDetailStyles } from '@/src/styles/product-detail';

interface ProductDetailParams {
  id: string;
  name?: string;
}

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  color?: string;
  size?: string;
}

interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ProductDetailScreen() {
  const params = useLocalSearchParams<ProductDetailParams>();
  const router = useRouter();
  
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  
  const productId = params.id || '1';
  const productName = params.name || 'Product Name';
  
  const productVariants: ProductVariant[] = useMemo(() => [
    { id: '1', name: 'Small', price: 29.99, size: 'S' },
    { id: '2', name: 'Medium', price: 34.99, size: 'M' },
    { id: '3', name: 'Large', price: 39.99, size: 'L' },
  ], []);
  
  const productReviews: ProductReview[] = useMemo(() => [
    { id: '1', userName: 'John Doe', rating: 5, comment: 'Great product!', date: '2024-01-15' },
    { id: '2', userName: 'Jane Smith', rating: 4, comment: 'Good quality', date: '2024-01-10' },
  ], []);
  
  const handleAddToCart = useCallback(() => {
    console.log('Add to cart:', { productId, selectedVariant, quantity });
    router.push('/cart');
  }, [productId, selectedVariant, quantity, router]);
  
  const handleBuyNow = useCallback(() => {
    console.log('Buy now:', { productId, selectedVariant, quantity });
    router.push('/checkout');
  }, [productId, selectedVariant, quantity, router]);
  
  const handleVariantSelect = useCallback((variant: ProductVariant) => {
    setSelectedVariant(variant);
  }, []);
  
  const handleQuantityChange = useCallback((newQuantity: number) => {
    setQuantity(newQuantity);
  }, []);
  
  const totalPrice = useMemo(() => {
    return selectedVariant ? selectedVariant.price * quantity : 0;
  }, [selectedVariant, quantity]);
  
  return (
    <ScrollView style={productDetailStyles.container}>
      <View style={productDetailStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={productDetailStyles.title}>{productName}</Text>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>
      
      <ImageCarousel images={[
        'https://via.placeholder.com/400x400',
        'https://via.placeholder.com/400x400',
        'https://via.placeholder.com/400x400'
      ]} />
      
      <View style={productDetailStyles.content}>
        <Text style={productDetailStyles.productName}>{productName}</Text>
        <Text style={productDetailStyles.price}>
          ${selectedVariant ? selectedVariant.price.toFixed(2) : '29.99'}
        </Text>
        
        <Text style={productDetailStyles.sectionTitle}>Select Variant</Text>
        <VariantSelector 
          variants={productVariants}
          selectedVariant={selectedVariant}
          onSelect={handleVariantSelect}
        />
        
        <Text style={productDetailStyles.sectionTitle}>Quantity</Text>
        <QuantitySelector 
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
        />
        
        <Text style={productDetailStyles.sectionTitle}>Description</Text>
        <Text style={productDetailStyles.description}>
          This is a high-quality product with excellent features and durability.
          Perfect for everyday use and designed to last.
        </Text>
        
        <Text style={productDetailStyles.sectionTitle}>Reviews ({productReviews.length})</Text>
        {productReviews.map((review: ProductReview) => (
          <ReviewCard key={review.id} review={review} />
        ))}
        
        <View style={productDetailStyles.actionButtons}>
          <Button 
            title="Add to Cart"
            onPress={handleAddToCart}
            variant="outline"
            style={productDetailStyles.addToCartButton}
          />
          <Button 
            title={`Buy Now $${totalPrice.toFixed(2)}`}
            onPress={handleBuyNow}
            style={productDetailStyles.buyNowButton}
          />
        </View>
      </View>
    </ScrollView>
  );
}
