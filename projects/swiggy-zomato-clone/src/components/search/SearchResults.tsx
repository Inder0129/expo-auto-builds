import React, { useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import RestaurantCard from '@/src/components/ui/RestaurantCard';
import { colors, spacing, typography } from '@/src/theme';
import { Restaurant } from '@/src/store/slices/restaurants';

type SearchType = 'restaurants' | 'dishes';

type SearchResultsProps = {
  results: Restaurant[];
  searchType: SearchType;
  onResultPress: (restaurantId: string) => void;
};

export default function SearchResults({
  results,
  searchType,
  onResultPress,
}: SearchResultsProps) {
  const renderRestaurant = useCallback(({ item }: { item: Restaurant }) => (
    <RestaurantCard
      restaurant={item}
      onPress={() => onResultPress(item.id)}
      style={styles.restaurantCard}
    />
  ), [onResultPress]);

  if (results.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {searchType === 'restaurants' ? 'No restaurants found' : 'No dishes found'}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={results}
      renderItem={renderRestaurant}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.resultsContent}
    />
  );
}

const styles = {
  emptyContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    paddingTop: spacing.xl * 2,
  },
  emptyText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  resultsContent: {
    paddingBottom: spacing.xl,
  },
  restaurantCard: {
    marginBottom: spacing.md,
  },
};
