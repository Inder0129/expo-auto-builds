import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { Button } from '@/src/components/ui';

interface RecentSearch {
  id: string;
  query: string;
  timestamp: number;
}

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSearchPress: (search: RecentSearch) => void;
  onClear: () => void;
}

const RecentSearches: React.FC<RecentSearchesProps> = (props: RecentSearchesProps) => {
  const { searches, onSearchPress, onClear } = props;

  const formatTime = (timestamp: number): string => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  const renderItem = ({ item }: { item: RecentSearch }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onSearchPress(item)}
    >
      <Ionicons
        name="time-outline"
        size={20}
        color={colors.textSecondary}
        style={styles.itemIcon}
      />
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>{item.query}</Text>
        <Text style={styles.itemTime}>{formatTime(item.timestamp)}</Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.textSecondary}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Searches</Text>
        {searches.length > 0 && (
          <Button
            title="Clear all"
            variant="text"
            onPress={onClear}
            style={styles.clearButton}
          />
        )}
      </View>
      {searches.length > 0 ? (
        <FlatList
          data={searches}
          renderItem={renderItem}
          keyExtractor={(item: RecentSearch) => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons
            name="search-outline"
            size={48}
            color={colors.textSecondary}
          />
          <Text style={styles.emptyText}>No recent searches</Text>
          <Text style={styles.emptySubtext}>Your search history will appear here</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  clearButton: {
    paddingHorizontal: 0,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  itemTime: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default RecentSearches;