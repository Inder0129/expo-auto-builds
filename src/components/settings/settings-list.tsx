import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';
import { styles } from './settings-list.styles';

type SettingsItem = {
  id: string;
  title: string;
  description?: string;
  icon: string;
  onPress: () => void;
};

type SettingsListProps = {
  items: SettingsItem[];
};

export const SettingsList = memo(({ items }: SettingsListProps) => {
  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.item}
          onPress={item.onPress}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon as any} size={24} color={colors.primary} />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            {item.description && (
              <Text style={styles.description}>{item.description}</Text>
            )}
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
        </TouchableOpacity>
      ))}
    </View>
  );
});
