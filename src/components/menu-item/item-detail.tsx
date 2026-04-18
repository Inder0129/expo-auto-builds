import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  preparationTime: number;
}

interface ItemDetailProps {
  item: MenuItem;
  style?: any;
}

const ItemDetail: React.FC<ItemDetailProps> = ({ item, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.description}>{item.description}</Text>
        
        <View style={styles.detailsRow}>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>{item.rating} ★</Text>
          </View>
          <Text style={styles.preparationTime}>{item.preparationTime} min</Text>
        </View>
        
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
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
    height: 250,
  },
  content: {
    padding: spacing.md,
  },
  name: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  category: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  ratingContainer: {
    backgroundColor: colors.primary.light,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    marginRight: spacing.md,
  },
  ratingText: {
    ...typography.small,
    color: colors.primary.main,
    fontWeight: '600',
  },
  preparationTime: {
    ...typography.body,
    color: colors.text.secondary,
  },
  price: {
    ...typography.h1,
    color: colors.primary.main,
  },
});

export { ItemDetail };