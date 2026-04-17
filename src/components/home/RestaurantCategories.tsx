import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

type Category = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
};

type RestaurantCategoriesProps = {
  onCategoryPress: (categoryId: string) => void;
};

export default function RestaurantCategories({ onCategoryPress }: RestaurantCategoriesProps) {
  const categories: Category[] = [
    { id: '1', name: 'Pizza', icon: 'pizza-outline' },
    { id: '2', name: 'Burger', icon: 'fast-food-outline' },
    { id: '3', name: 'Chinese', icon: 'restaurant-outline' },
    { id: '4', name: 'Indian', icon: 'flame-outline' },
    { id: '5', name: 'Desserts', icon: 'ice-cream-outline' },
    { id: '6', name: 'Biryani', icon: 'bowl-outline' },
  ];

  const renderCategory = useCallback(({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => onCategoryPress(item.id)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon} size={24} color={colors.primary} />
      </View>
      <Text style={styles.categoryName} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  ), [onCategoryPress]);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Food Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContent}
      />
    </View>
  );
}

const styles = {
  container: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  categoriesContent: {
    paddingRight: spacing.md,
  },
  categoryItem: {
    alignItems: 'center' as const,
    marginRight: spacing.lg,
    width: 70,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surface,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: spacing.xs,
  },
  categoryName: {
    ...typography.caption,
    color: colors.text.primary,
    textAlign: 'center' as const,
  },
};
