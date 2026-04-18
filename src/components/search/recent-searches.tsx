import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface RecentSearch {
  id: string;
  query: string;
  timestamp: number;
}

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSearchSelect: (query: string) => void;
  onClearItem: (id: string) => void;
  onClearAll: () => void;
  style?: ViewStyle;
}

export const RecentSearches: React.FC<RecentSearchesProps> = (props: RecentSearchesProps) => {
  const { searches, onSearchSelect, onClearItem, onClearAll, style } = props;

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  const renderItem = ({ item }: { item: RecentSearch }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.searchItem}
        onPress={() => onSearchSelect(item.query)}
      >
        <Ionicons name="time-outline" size={20} color={colors.gray500} style={styles.timeIcon} />
        <View style={styles.itemContent}>
          <Text style={styles.queryText}>{item.query}</Text>
          <Text style={styles.timeText}>{formatTime(item.timestamp)}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onClearItem(item.id)} style={styles.clearItemButton}>
        <Ionicons name="close" size={20} color={colors.gray400} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Searches</Text>
        {searches.length > 0 && (
          <TouchableOpacity onPress={onClearAll}>
            <Text style={styles.clearAllText}>Clear all</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={searches}
        renderItem={renderItem}
        keyExtractor={(item: RecentSearch) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
  clearAllText: {
    ...typography.caption,
    color: colors.primary,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  timeIcon: {
    marginRight: spacing.sm,
  },
  itemContent: {
    flex: 1,
  },
  queryText: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  timeText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  clearItemButton: {
    padding: spacing.xs,
  },
});
