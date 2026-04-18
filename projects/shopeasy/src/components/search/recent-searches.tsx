import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';

interface RecentSearch {
  id: string;
  query: string;
  timestamp: string;
}

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSearchPress: (query: string) => void;
  onClearPress: () => void;
  style?: ViewStyle;
}

const RecentSearches: React.FC<RecentSearchesProps> = (props: RecentSearchesProps) => {
  const { searches, onSearchPress, onClearPress, style } = props;

  const handleSearchPress = useCallback((query: string) => {
    onSearchPress(query);
  }, [onSearchPress]);

  if (searches.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Searches</Text>
        <TouchableOpacity onPress={onClearPress}>
          <Text style={styles.clearButton}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        {searches.map((search: RecentSearch) => (
          <TouchableOpacity
            key={search.id}
            style={styles.searchItem}
            onPress={() => handleSearchPress(search.query)}
          >
            <Ionicons name="time-outline" size={18} color={colors.textSecondary} style={styles.icon} />
            <View style={styles.searchContent}>
              <Text style={styles.searchQuery}>{search.query}</Text>
              <Text style={styles.searchTimestamp}>{search.timestamp}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  clearButton: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  listContainer: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    overflow: 'hidden',
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  icon: {
    marginRight: 12,
  },
  searchContent: {
    flex: 1,
  },
  searchQuery: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  searchTimestamp: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default RecentSearches;
