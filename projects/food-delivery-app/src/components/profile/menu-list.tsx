import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
}

interface Props {
  items: MenuItem[];
  style?: any;
}

export const MenuList: React.FC<Props> = ({ items, style }) => {
  return (
    <View style={[styles.container, style]}>
      {items.map((item: MenuItem) => (
        <TouchableOpacity
          key={item.id}
          style={styles.item}
          onPress={item.onPress}
          activeOpacity={0.7}
        >
          <View style={styles.itemLeft}>
            <Feather name={item.icon as any} size={24} color={colors.primary.main} />
            <Text style={styles.itemTitle}>{item.title}</Text>
          </View>
          <Feather name="chevron-right" size={20} color={colors.text.secondary} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
    marginLeft: spacing.md,
  },
});
