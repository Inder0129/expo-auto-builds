import React from 'react';
import { View, Text, TouchableOpacity, FlatList, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

type Category = {
  id: string;
  name: string;
  icon: string;
};

interface CategoryGridProps {
  categories: Category[];
  onCategoryPress: (categoryId: string) => void;
  style?: ViewStyle;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onCategoryPress, style }) => {
  const renderItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={categoryItemStyle}
      onPress={() => onCategoryPress(item.id)}
    >
      <View style={iconContainerStyle}>
        <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={24} color={colors.primary} />
      </View>
      <Text style={categoryNameStyle}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item: Category) => item.id}
      numColumns={3}
      columnWrapperStyle={columnWrapperStyle}
      style={style}
      scrollEnabled={false}
    />
  );
};

const columnWrapperStyle: ViewStyle = {
  justifyContent: 'space-between',
  marginBottom: spacing.lg,
};

const categoryItemStyle: ViewStyle = {
  alignItems: 'center',
  width: '30%',
};

const iconContainerStyle: ViewStyle = {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: colors.lightGray,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: spacing.sm,
};

const categoryNameStyle: TextStyle = {
  ...typography.bodySmall,
  color: colors.text,
  textAlign: 'center',
};
