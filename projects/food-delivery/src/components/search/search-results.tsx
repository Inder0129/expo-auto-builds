import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '@/src/theme';

interface SearchResult {
  id: string;
  name: string;
  type: 'restaurant' | 'dish';
  rating?: number;
  deliveryTime?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  onResultPress: (result: SearchResult) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = (props) => {
  const { results, onResultPress } = props;

  const renderResultItem = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => onResultPress(item)}
    >
      <View style={styles.resultContent}>
        <Text style={styles.resultName}>{item.name}</Text>
        <View style={styles.resultMeta}>
          {item.type === 'restaurant' && (
            <>
              {item.rating && (
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={12} color={colors.warning} />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              )}
              {item.deliveryTime && (
                <Text style={styles.deliveryTime}>{item.deliveryTime}</Text>
              )}
            </>
          )}
          <Text style={styles.resultType}>
            {item.type === 'restaurant' ? 'Restaurant' : 'Dish'}
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  if (results.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="search-outline" size={48} color={colors.textSecondary} />
        <Text style={styles.emptyText}>No results found</Text>
        <Text style={styles.emptySubtext}>Try a different search term</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.resultsCount}>{results.length} results found</Text>
      <FlatList
        data={results}
        renderItem={renderResultItem}
        keyExtractor={(item: SearchResult) => item.id}
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
  resultsCount: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultContent: {
    flex: 1,
  },
  resultName: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  resultMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  ratingText: {
    ...typography.caption,
    color: colors.textPrimary,
    marginLeft: spacing.xs,
  },
  deliveryTime: {
    ...typography.caption,
    color: colors.textSecondary,
    marginRight: spacing.md,
  },
  resultType: {
    ...typography.caption,
    color: colors.primary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyText: {
    ...typography.h3,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  emptySubtext: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
