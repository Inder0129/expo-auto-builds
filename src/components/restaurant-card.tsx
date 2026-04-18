import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface RestaurantCardProps {
  restaurant: {
    id: string;
    name: string;
    rating: number;
    deliveryTime: string;
    cuisine: string;
    imageUrl: string;
  };
  onPress: () => void;
  style?: any;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image source={{ uri: restaurant.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color={colors.warning} />
          <Text style={styles.ratingText}>{restaurant.rating}</Text>
        </View>
        <Text style={styles.cuisine} numberOfLines={1}>{restaurant.cuisine}</Text>
        <Text style={styles.deliveryTime}>{restaurant.deliveryTime}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
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
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  cuisine: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  deliveryTime: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
  },
});
