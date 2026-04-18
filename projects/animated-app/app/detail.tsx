import React, { useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme/colors';
import { spacing } from '@/src/theme/spacing';
import { typography } from '@/src/theme/typography';
import { DetailHeader } from '@/src/components/detail/detail-header';
import { ImageGallery } from '@/src/components/detail/image-gallery';
import { ActionButtons } from '@/src/components/detail/action-buttons';
import { styles } from '@/src/styles/detail';

const { width } = Dimensions.get('window');

type ProductDetail = {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  features: string[];
};

export default function DetailScreen() {
  const router = useRouter();

  const product: ProductDetail = {
    id: '1',
    title: 'Premium Wireless Headphones',
    description: 'Experience crystal-clear audio with our premium wireless headphones. Featuring noise cancellation, 30-hour battery life, and comfortable over-ear design.',
    price: 299.99,
    rating: 4.8,
    reviewCount: 1247,
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.3',
      'Voice assistant support',
      'Foldable design',
      'Carrying case included'
    ]
  };

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleAddToCart = useCallback(() => {
    console.log('Added to cart:', product.id);
  }, [product.id]);

  const handleBuyNow = useCallback(() => {
    console.log('Buy now:', product.id);
  }, [product.id]);

  return (
    <View style={styles.container}>
      <DetailHeader 
        title={product.title}
        onBack={handleBack}
      />

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.duration(600)}>
          <ImageGallery />
        </Animated.View>

        <Animated.View entering={SlideInUp.delay(200).duration(600)} style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.stars}>
              {[...Array(5)].map((_, index: number) => (
                <Ionicons 
                  key={index}
                  name={index < Math.floor(product.rating) ? 'star' : 'star-outline'}
                  size={20}
                  color={colors.primary}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>
              {product.rating} ({product.reviewCount} reviews)
            </Text>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Features</Text>
            {product.features.map((feature: string, index: number) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      <ActionButtons 
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </View>
  );
}
