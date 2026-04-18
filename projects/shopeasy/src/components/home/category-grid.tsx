import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export interface CategoryGridProps {
  categories: Category[];
  onCategoryPress: (categoryId: string) => void;
  style?: ViewStyle;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onCategoryPress, style }) => {
  const handlePress = useCallback((categoryId: string) => {
    onCategoryPress?.(categoryId);
  }, [onCategoryPress]);

  return (
    <View style={[styles.container, style]}>
      {categories.map((category: Category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryItem}
          onPress={() => handlePress(category.id)}
          activeOpacity={0.7}
        >
          <View style={[styles.iconContainer, { backgroundColor: category.color + '20' }]}>
            <Feather name={category.icon as any} size={24} color={category.color} />
          </View>
          <Text style={styles.categoryName} numberOfLines={2}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryName: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
    textAlign: 'center',
  },
});
