import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, typography } from '@/src/theme';

export interface ItemDetailProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    available: boolean;
  };
  style?: ViewStyle;
}

export const ItemDetail: React.FC<ItemDetailProps> = (props: ItemDetailProps) => {
  const { item, style } = props;
  
  return (
    <View style={[styles.container, style]}>
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.availabilityContainer}>
          <View style={[styles.availabilityDot, { backgroundColor: item.available ? colors.success : colors.error }]} />
          <Text style={styles.availabilityText}>
            {item.available ? 'Available' : 'Out of Stock'}
          </Text>
        </View>
      </View>
    </View>
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
    height: 200,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  name: {
    ...typography.h2,
    color: colors.text.primary,
    flex: 1,
    marginRight: spacing.sm,
  },
  price: {
    ...typography.h2,
    color: colors.primary,
  },
  category: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  availabilityText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
});
