import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { Restaurant } from '@/src/store/slices/restaurants';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: () => void;
  variant?: 'default' | 'compact';
  style?: any;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onPress, variant = 'default', style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image source={{ uri: restaurant.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color={colors.warning} />
          <Text style={styles.ratingText}>{restaurant.rating}</Text>
          <Text style={styles.cuisineText}>• {restaurant.cuisine}</Text>
        </View>
        <View style={styles.deliveryContainer}>
          <Text style={styles.deliveryText}>{restaurant.deliveryTime} • {restaurant.distance}</Text>
          {variant === 'default' && (
            <Text style={styles.priceText}>₹{restaurant.minOrder} for one</Text>
          )}
        </View>
        {restaurant.offer && (
          <View style={styles.offerContainer}>
            <Ionicons name="pricetag" size={12} color={colors.success} />
            <Text style={styles.offerText}>{restaurant.offer}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  cuisineText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  deliveryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  deliveryText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  priceText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  offerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  offerText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '600',
  },
});
