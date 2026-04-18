import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface RecentSearchesProps {
  searches: string[];
  onSelect: (search: string) => void;
  onClear: () => void;
  onRemove: (item: string) => void;
}

export const RecentSearches: React.FC<RecentSearchesProps> = (props) => {
  const { searches, onSelect, onClear, onRemove } = props;

  const renderSearchItem = ({ item }: { item: string }) => (
    <View style={styles.searchItem}>
      <TouchableOpacity
        style={styles.searchContent}
        onPress={() => onSelect(item)}
      >
        <Ionicons name="time-outline" size={16} color={colors.textSecondary} style={styles.icon} />
        <Text style={styles.searchText}>{item}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onRemove(item)}>
        <Ionicons name="close" size={16} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );

  if (searches.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Searches</Text>
        <TouchableOpacity onPress={onClear}>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={searches}
        renderItem={renderSearchItem}
        keyExtractor={(item: string) => item}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
  clearText: {
    ...typography.caption,
    color: colors.primary,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: spacing.sm,
  },
  searchText: {
    ...typography.body,
    color: colors.textPrimary,
  },
});
