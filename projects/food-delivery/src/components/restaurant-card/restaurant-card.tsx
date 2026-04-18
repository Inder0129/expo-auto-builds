import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { Restaurant } from '@/src/store/slices/restaurants';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: () => void;
  style?: any;
  variant?: 'default' | 'compact';
}

export const RestaurantCard: React.FC<RestaurantCardProps> = (props) => {
  const { restaurant, onPress, style, variant = 'default' } = props;
  
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image
        source={{ uri: restaurant.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={colors.warning} />
            <Text style={styles.rating}>{restaurant.rating.toFixed(1)}</Text>
          </View>
        </View>
        
        <View style={styles.details}>
          <Text style={styles.cuisine} numberOfLines={1}>{restaurant.cuisine}</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.deliveryTime}>{restaurant.deliveryTime} min</Text>
          {restaurant.distance && (
            <>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.distance}>{restaurant.distance} km</Text>
            </>
          )}
        </View>
        
        {variant === 'default' && restaurant.description && (
          <Text style={styles.description} numberOfLines={2}>{restaurant.description}</Text>
        )}
        
        {restaurant.hasOffers && (
          <View style={styles.offerBadge}>
            <Ionicons name="pricetag-outline" size={12} color={colors.success} />
            <Text style={styles.offerText}>Offers available</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ratingBackground,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: 2,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cuisine: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  dot: {
    fontSize: 14,
    color: colors.textTertiary,
    marginHorizontal: 4,
  },
  deliveryTime: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  distance: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  offerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.successLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  offerText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '500',
    marginLeft: 4,
  },
});
