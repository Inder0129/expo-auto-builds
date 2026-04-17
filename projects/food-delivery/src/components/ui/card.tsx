import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ViewStyle, ImageStyle } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';
import { Rating } from './rating';

interface CardProps {
  restaurant: {
    id: string;
    name: string;
    rating: number;
    deliveryTime: string;
    imageUrl: string;
    cuisine?: string;
  };
  onPress: () => void;
  style?: ViewStyle;
}

const RestaurantCard: React.FC<CardProps> = (props: CardProps) => {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress} activeOpacity={0.8}>
      <Image
        source={{ uri: props.restaurant.imageUrl || 'https://via.placeholder.com/300x200' }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {props.restaurant.name}
        </Text>
        {props.restaurant.cuisine && (
          <Text style={styles.cuisine} numberOfLines={1}>
            {props.restaurant.cuisine}
          </Text>
        )}
        <View style={styles.footer}>
          <Rating rating={props.restaurant.rating} />
          <Text style={styles.deliveryTime}>{props.restaurant.deliveryTime}</Text>
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
    marginBottom: spacing.lg,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: spacing.lg,
  },
  name: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  cuisine: {
    fontSize: typography.fontSize.sm,
    color: colors.gray,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryTime: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
});

export default RestaurantCard;