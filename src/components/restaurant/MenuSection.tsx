import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Restaurant } from '@/src/store/slices/restaurants';
import { MenuItemCard } from '@/src/components/ui/MenuItemCard';
import styles from './menu-section.styles';

type MenuSectionProps = {
  restaurant: Restaurant;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onAddToCart: (menuItem: any) => void;
};

export function MenuSection({
  restaurant,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
}: MenuSectionProps) {
  const categories = useMemo(() => {
    const allCategories = ['all', ...restaurant.categories];
    return allCategories;
  }, [restaurant.categories]);

  const filteredMenuItems = useMemo(() => {
    if (selectedCategory === 'all') {
      return restaurant.menuItems;
    }
    return restaurant.menuItems.filter(
      (item) => item.category === selectedCategory
    );
  }, [restaurant.menuItems, selectedCategory]);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={filteredMenuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MenuItemCard item={item} onAddToCart={() => onAddToCart(item)} />
        )}
        contentContainerStyle={styles.menuList}
        scrollEnabled={false}
      />
    </View>
  );
}
