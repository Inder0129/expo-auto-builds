import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface Props {
  name: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  address: string;
  description: string;
  imageUrl: string;
  style?: any;
}

export const RestaurantHeader: React.FC<Props> = ({
  name,
  rating,
  deliveryTime,
  deliveryFee,
  minOrder,
  address,
  description,
  imageUrl,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: imageUrl || 'https://example.com/restaurant.jpg' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.ratingContainer}>
          <Feather name="star" size={16} color={colors.warning} />
          <Text style={styles.rating}>{rating.toFixed(1)}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Feather name="clock" size={16} color={colors.text.secondary} />
            <Text style={styles.detailText}>{deliveryTime}</Text>
          </View>
          <View style={styles.detailItem}>
            <Feather name="dollar-sign" size={16} color={colors.text.secondary} />
            <Text style={styles.detailText}>${deliveryFee.toFixed(2)} delivery</Text>
          </View>
          <View style={styles.detailItem}>
            <Feather name="shopping-bag" size={16} color={colors.text.secondary} />
            <Text style={styles.detailText}>${minOrder.toFixed(2)} min</Text>
          </View>
        </View>
        <View style={styles.addressContainer}>
          <Feather name="map-pin" size={16} color={colors.text.secondary} />
          <Text style={styles.address}>{address}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: colors.primary.light,
  },
  content: {
    padding: spacing.lg,
  },
  name: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  rating: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
    marginLeft: spacing.xs,
  },
  description: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    lineHeight: typography.lineHeight.md,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
    flex: 1,
  },
});
