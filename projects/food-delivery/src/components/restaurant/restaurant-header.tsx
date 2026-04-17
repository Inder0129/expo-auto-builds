import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

export interface RestaurantHeaderProps {
  name: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
}

export const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({
  name,
  rating,
  deliveryTime,
  deliveryFee,
  image,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="star" size={16} color={colors.warning} />
            <Text style={styles.detailText}>{rating.toFixed(1)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={16} color={colors.text.secondary} />
            <Text style={styles.detailText}>{deliveryTime}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="car-outline" size={16} color={colors.text.secondary} />
            <Text style={styles.detailText}>${deliveryFee.toFixed(2)} delivery</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    height: 250,
    position: 'relative' as const,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  content: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
  },
  name: {
    ...typography.h1,
    color: colors.text.inverse,
    marginBottom: spacing.sm,
  },
  details: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  detailItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginRight: spacing.lg,
  },
  detailText: {
    ...typography.body,
    color: colors.text.inverse,
    marginLeft: spacing.xs,
  },
};
