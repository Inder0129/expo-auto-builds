import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { typography } from '../../src/theme/typography';
import { Button } from '../../src/components/ui/Button';
import { Card } from '../../src/components/ui/Card';

export default function ExploreScreen() {
  const [selectedCuisine, setSelectedCuisine] = useState<string>('all');

  const cuisines = [
    { id: 'all', name: 'All' },
    { id: 'italian', name: 'Italian' },
    { id: 'mexican', name: 'Mexican' },
    { id: 'chinese', name: 'Chinese' },
    { id: 'indian', name: 'Indian' },
    { id: 'japanese', name: 'Japanese' },
  ];

  const restaurants = [
    { id: '1', name: 'Pasta Palace', cuisine: 'Italian', rating: 4.5, deliveryTime: '25-35 min' },
    { id: '2', name: 'Taco Town', cuisine: 'Mexican', rating: 4.2, deliveryTime: '20-30 min' },
    { id: '3', name: 'Dragon Garden', cuisine: 'Chinese', rating: 4.7, deliveryTime: '30-40 min' },
    { id: '4', name: 'Spice Route', cuisine: 'Indian', rating: 4.8, deliveryTime: '35-45 min' },
    { id: '5', name: 'Sushi Zen', cuisine: 'Japanese', rating: 4.6, deliveryTime: '25-35 min' },
  ];

  const filteredRestaurants = selectedCuisine === 'all' 
    ? restaurants 
    : restaurants.filter((restaurant) => restaurant.cuisine.toLowerCase() === selectedCuisine);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore Restaurants</Text>
        <Text style={styles.subtitle}>Discover delicious food near you</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cuisineScroll}>
        {cuisines.map((cuisine) => (
          <Button
            key={cuisine.id}
            title={cuisine.name}
            onPress={() => setSelectedCuisine(cuisine.id)}
            variant={selectedCuisine === cuisine.id ? 'primary' : 'outline'}
            style={styles.cuisineButton}
          />
        ))}
      </ScrollView>

      <ScrollView style={styles.restaurantScroll} showsVerticalScrollIndicator={false}>
        {filteredRestaurants.map((restaurant) => (
          <Card key={restaurant.id} style={styles.restaurantCard}>
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
              <View style={styles.restaurantDetails}>
                <Text style={styles.restaurantRating}>⭐ {restaurant.rating}</Text>
                <Text style={styles.restaurantTime}>⏱️ {restaurant.deliveryTime}</Text>
              </View>
            </View>
            <Button title="Order" onPress={() => {}} variant="primary" />
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
  },
  header: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  cuisineScroll: {
    marginBottom: spacing.lg,
  },
  cuisineButton: {
    marginRight: spacing.sm,
  },
  restaurantScroll: {
    flex: 1,
  },
  restaurantCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    ...typography.h3,
    color: colors.text,
  },
  restaurantCuisine: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  restaurantDetails: {
    flexDirection: 'row',
    marginTop: spacing.sm,
    gap: spacing.md,
  },
  restaurantRating: {
    ...typography.caption,
    color: colors.text,
  },
  restaurantTime: {
    ...typography.caption,
    color: colors.text,
  },
});