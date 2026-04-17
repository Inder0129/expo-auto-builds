import React, { useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import RestaurantCard from '@/src/components/ui/RestaurantCard';
import { colors, spacing, typography } from '@/src/theme';
import { Restaurant } from '@/src/store/slices/restaurants';

type FeaturedRestaurantsProps = {
  restaurants: Restaurant[];
  onRestaurantPress: (restaurantId: string) => void;
};

export default function FeaturedRestaurants({
  restaurants,
  onRestaurantPress,
}: FeaturedRestaurantsProps) {
  const renderRestaurant = useCallback(({ item }: { item: Restaurant }) => (
    <RestaurantCard
      restaurant={item}
      onPress={() => onRestaurantPress(item.id)}
      style={styles.restaurantCard}
    />
  ), [onRestaurantPress]);

  if (restaurants.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Featured Restaurants</Text>
      <FlatList
        data={restaurants}
        renderItem={renderRestaurant}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.restaurantsContent}
      />
    </View>
  );
}

const styles = {
  container: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  restaurantsContent: {
    paddingRight: spacing.md,
  },
  restaurantCard: {
    width: 280,
    marginRight: spacing.md,
  },
};
