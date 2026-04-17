import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

type Category = {
  id: string;
  title: string;
  icon: keyof typeof Feather.glyphMap;
};

type CategoryGridProps = {
  categories: Category[];
  selectedCategory: string | null;
  onSelect: (categoryId: string) => void;
};

export function CategoryGrid({ categories, selectedCategory, onSelect }: CategoryGridProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <View style={styles.grid}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              selectedCategory === category.id && styles.categoryItemSelected
            ]}
            onPress={() => onSelect(category.id)}
          >
            <View style={[
              styles.iconContainer,
              selectedCategory === category.id && styles.iconContainerSelected
            ]}>
              <Feather 
                name={category.icon} 
                size={24} 
                color={selectedCategory === category.id ? colors.white : colors.primary} 
              />
            </View>
            <Text style={[
              styles.categoryTitle,
              selectedCategory === category.id && styles.categoryTitleSelected
            ]}>
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '31%',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  categoryItemSelected: {
    // Add selected styles if needed
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  iconContainerSelected: {
    backgroundColor: colors.primary,
  },
  categoryTitle: {
    ...typography.caption,
    textAlign: 'center',
  },
  categoryTitleSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
});
