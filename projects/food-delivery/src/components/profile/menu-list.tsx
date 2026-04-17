import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

export interface MenuItem {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
}

export interface MenuListProps {
  items: MenuItem[];
}

export const MenuList: React.FC<MenuListProps> = ({ items }) => {
  return (
    <View style={styles.container}>
      {items.map((item: MenuItem) => (
        <TouchableOpacity key={item.id} onPress={item.onPress} style={styles.item}>
          <View style={styles.itemLeft}>
            <Ionicons name={item.icon as any} size={24} color={colors.primary} style={styles.icon} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden' as const,
  },
  item: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  icon: {
    marginRight: spacing.md,
  },
  title: {
    ...typography.body,
    color: colors.text.primary,
  },
};
