import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '@/src/theme';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  imageUrl: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: () => void;
  style?: ViewStyle;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Image source={{ uri: restaurant.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={colors.warning} />
            <Text style={styles.rating}>{restaurant.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.cuisine} numberOfLines={1}>{restaurant.cuisine}</Text>
        <View style={styles.footer}>
          <View style={styles.deliveryTimeContainer}>
            <Ionicons name="time" size={16} color={colors.textSecondary} />
            <Text style={styles.deliveryTime}>{restaurant.deliveryTime}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  name: {
    ...typography.h3,
    flex: 1,
    marginRight: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    ...typography.bodySmall,
    marginLeft: spacing.xs,
    color: colors.text,
  },
  cuisine: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryTime: {
    ...typography.bodySmall,
    marginLeft: spacing.xs,
    color: colors.textSecondary,
  },
});
