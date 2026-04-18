import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { Category } from '@/src/constants';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
  style?: any;
}

export const CategoryCard: React.FC<CategoryCardProps> = (props) => {
  const { category, onPress, style } = props;
  
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={category.icon as any} size={24} color={colors.primary} />
      </View>
      <Text style={styles.name} numberOfLines={2}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textPrimary,
    textAlign: 'center',
  },
});
