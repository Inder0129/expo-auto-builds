import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface RecentSearch {
  id: string;
  query: string;
  timestamp: number;
}

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSelectSearch: (query: string) => void;
  onRemoveSearch: (id: string) => void;
  onClearAll: () => void;
  style?: ViewStyle;
}

const RecentSearches: React.FC<RecentSearchesProps> = (props: RecentSearchesProps) => {
  const { searches, onSelectSearch, onRemoveSearch, onClearAll, style } = props;

  const formatTime = useCallback((timestamp: number): string => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  }, []);

  const renderItem = useCallback(({ item }: { item: RecentSearch }) => (
    <View style={styles.searchItem}>
      <TouchableOpacity 
        style={styles.searchContent}
        onPress={() => onSelectSearch(item.query)}
      >
        <Ionicons name="time" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <View style={styles.searchTextContainer}>
          <Text style={styles.searchQuery}>{item.query}</Text>
          <Text style={styles.searchTime}>{formatTime(item.timestamp)}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => onRemoveSearch(item.id)}
        style={styles.removeButton}
      >
        <Ionicons name="close" size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  ), [onSelectSearch, onRemoveSearch, formatTime]);

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
    paddingHorizontal: 16,
    paddingTop: 24,
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
  clearAllText: {
    fontSize: 14,
    color: colors.primary,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchTextContainer: {
    flex: 1,
  },
  searchQuery: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  searchTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  removeButton: {
    padding: 4,
  },
});

export default RecentSearches;