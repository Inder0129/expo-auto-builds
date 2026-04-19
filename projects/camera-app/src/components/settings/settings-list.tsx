import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { colors } from '@/src/theme';

interface SettingItem {
  id: string;
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

interface SettingsListProps {
  items: SettingItem[];
  style?: any;
}

export function SettingsList(props: SettingsListProps) {
  const { items, style } = props;

  return (
    <View style={[styles.container, style]}>
      {items.map((item: SettingItem) => (
        <View key={item.id} style={styles.item}>
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <Switch
            value={item.value}
            onValueChange={item.onValueChange}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.white}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  content: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});
