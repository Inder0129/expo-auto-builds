import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { spacing } from '@/src/theme';
import { typography } from '@/src/theme';

type Category = {
  id: string;
  name: string;
  icon: string;
};

type CategoryGridProps = {
  categories: Category[];
  onCategoryPress: (categoryId: string) => void;
  style?: any;
};

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onCategoryPress, style }) => {
  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity 
      style={styles.categoryItem} 
      onPress={() => onCategoryPress(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={item.icon as any} size={24} color={colors.primary} />
      </View>
      <Text style={styles.categoryName} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  
  return (
    <FlatList
      data={categories}
      renderItem={renderCategory}
      keyExtractor={(item: Category) => item.id}
      numColumns={4}
      scrollEnabled={false}
      contentContainerStyle={[styles.container, style]}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xs
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: spacing.md
  },
  categoryItem: {
    alignItems: 'center',
    width: 70
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs
  },
  categoryName: {
    ...typography.bodySmall,
    color: colors.textPrimary,
    textAlign: 'center'
  }
});