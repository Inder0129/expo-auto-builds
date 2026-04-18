import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface ItemDetailProps {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  preparationTime: number;
}

export const ItemDetail: React.FC<ItemDetailProps> = (props: ItemDetailProps) => {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: props.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.description}>{props.description}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>{props.rating} ★</Text>
          </View>
          <Text style={styles.time}>{props.preparationTime} min</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    marginBottom: spacing.md,
    borderRadius: spacing.sm,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 200
  },
  content: {
    padding: spacing.md
  },
  name: {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: spacing.sm
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  price: {
    ...typography.h2,
    color: colors.primary
  },
  ratingContainer: {
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.xs
  },
  rating: {
    ...typography.bodySmall,
    color: colors.success
  },
  time: {
    ...typography.body,
    color: colors.textSecondary
  }
});