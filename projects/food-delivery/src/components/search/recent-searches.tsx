import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '@/src/theme';

interface RecentSearch {
  id: string;
  query: string;
  timestamp: number;
}

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSearch: (query: string) => void;
  onClear: () => void;
}

export const RecentSearches: React.FC<RecentSearchesProps> = (props: RecentSearchesProps) => {
  const { searches, onSearch, onClear } = props;

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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {searches.map((search: RecentSearch) => (
          <TouchableOpacity
            key={search.id}
            style={styles.searchChip}
            onPress={() => onSearch(search.query)}
          >
            <Ionicons name="time-outline" size={16} color={colors.muted} style={styles.chipIcon} />
            <Text style={styles.chipText}>{search.query}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  clearText: {
    fontSize: 14,
    color: colors.primary,
  },
  searchChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginRight: spacing.sm,
  },
  chipIcon: {
    marginRight: spacing.xs,
  },
  chipText: {
    fontSize: 14,
    color: colors.text,
  },
});
