import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { typography } from '@/src/theme';
import { spacing } from '@/src/theme';

interface RestaurantCardProps {
  restaurant: {
    id: string;
    name: string;
    image: string;
    rating: number;
    deliveryTime: number;
    deliveryFee: number;
    cuisines: string[];
    isPureVeg?: boolean;
    hasOffers?: boolean;
  };
  onPress: () => void;
  style?: any;
  variant?: 'default' | 'compact';
}

export const RestaurantCard: React.FC<RestaurantCardProps> = (props) => {
  const { restaurant, onPress, style, variant = 'default' } = props;
  
  const isCompact = variant === 'compact';
  
  return (
    <TouchableOpacity style={[styles.container, isCompact && styles.compactContainer, style]} onPress={onPress}>
      <Image 
        source={{ uri: restaurant.image }}
        style={[styles.image, isCompact && styles.compactImage]}
        resizeMode="cover"
      />
      
      {restaurant.hasOffers && (
        <View style={styles.offerBadge}>
          <Text style={styles.offerText}>OFFERS</Text>
        </View>
      )}
      
      <View style={[styles.content, isCompact && styles.compactContent]}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
          {restaurant.isPureVeg && (
            <View style={styles.vegBadge}>
              <Text style={styles.vegText}>🟢</Text>
            </View>
          )}
        </View>
        
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color={colors.warning} />
          <Text style={styles.ratingText}>{restaurant.rating.toFixed(1)}</Text>
          <Text style={styles.cuisinesText} numberOfLines={1}>
            • {restaurant.cuisines.join(', ')}
          </Text>
        </View>
        
        <View style={styles.deliveryInfo}>
          <Text style={styles.deliveryText}>
            {restaurant.deliveryTime} min • ₹{restaurant.deliveryFee} delivery
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 160,
  },
  compactImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: spacing.sm,
  },
  offerBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  offerText: {
    ...typography.caption,
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    padding: spacing.md,
  },
  compactContent: {
    flex: 1,
    padding: spacing.sm,
    paddingLeft: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  name: {
    ...typography.h3,
    color: colors.textPrimary,
    flex: 1,
    marginRight: spacing.sm,
  },
  vegBadge: {
    paddingHorizontal: spacing.xs,
  },
  vegText: {
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  ratingText: {
    ...typography.caption,
    color: colors.textPrimary,
    marginLeft: 4,
    marginRight: spacing.xs,
  },
  cuisinesText: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
