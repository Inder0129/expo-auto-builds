import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/src/theme';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
}

interface MenuListProps {
  items: MenuItem[];
  onItemPress: (item: MenuItem) => void;
  style?: object;
}

export const MenuList: React.FC<MenuListProps> = ({ items, onItemPress, style }) => {
  return (
    <View style={[styles.container, style]}>
      {items.map((item: MenuItem) => (
        <TouchableOpacity
          key={item.id}
          style={styles.item}
          onPress={() => onItemPress(item)}
          activeOpacity={0.7}
        >
          <View style={styles.itemLeft}>
            <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={24} color={colors.primary} />
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.gray} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 16,
    color: colors.text,
    marginLeft: spacing.md,
  },
});
