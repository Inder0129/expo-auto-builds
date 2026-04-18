import React, { useCallback, useMemo } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/src/theme';
import { RestaurantCard } from '@/src/components/restaurant-card';
import { CategoryCard } from '@/src/components/category-card';
import { OfferBanner } from '@/src/components/offer-banner';
import { SearchBar } from '@/src/components/search-bar';
import { useAppSelector } from '@/src/store/hooks';
import { Restaurant } from '@/src/store/slices/restaurants';
import { Category } from '@/src/types';
import { Offer } from '@/src/types';
import styles from '@/src/styles/home';

interface HomeScreenProps {}

type FeaturedSection = {
  id: string;
  title: string;
  restaurants: Restaurant[];
};

export default function HomeScreen(props: HomeScreenProps) {
  const restaurants = useAppSelector((state: any) => state.restaurants.featured);
  const categories = useAppSelector((state: any) => state.restaurants.categories);
  const offers = useAppSelector((state: any) => state.restaurants.offers);

  const featuredSections: FeaturedSection[] = useMemo(() => [
    { id: '1', title: 'Top Rated', restaurants: restaurants.slice(0, 3) },
    { id: '2', title: 'Near You', restaurants: restaurants.slice(3, 6) },
    { id: '3', title: 'Popular', restaurants: restaurants.slice(6, 9) }
  ], [restaurants]);

  const handleSearchPress = useCallback(() => {
    // Navigate to search modal
  }, []);

  const handleCategoryPress = useCallback((categoryId: string) => {
    // Navigate to explore with filter
  }, []);

  const handleOfferPress = useCallback((offerId: string) => {
    // Navigate to offer details
  }, []);

  const handleRestaurantPress = useCallback((restaurantId: string) => {
    // Navigate to restaurant modal
  }, []);

  const renderCategoryItem = useCallback(({ item }: { item: Category }) => (
    <CategoryCard
      category={item}
      onPress={() => handleCategoryPress(item.id)}
      style={styles.categoryItem}
    />
  ), [handleCategoryPress]);

  const renderOfferItem = useCallback(({ item }: { item: Offer }) => (
    <OfferBanner
      offer={item}
      onPress={() => handleOfferPress(item.id)}
      style={styles.offerItem}
    />
  ), [handleOfferPress]);

  const renderFeaturedSection = useCallback(({ item }: { item: FeaturedSection }) => (
    <View style={styles.featuredSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{item.title}</Text>
        <Link href="/(tabs)/explore" style={styles.seeAllLink}>
          <Text style={styles.seeAllText}>See All</Text>
        </Link>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {item.restaurants.map((restaurant: Restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onPress={() => handleRestaurantPress(restaurant.id)}
            style={styles.restaurantCard}
          />
        ))}
      </ScrollView>
    </View>
  ), [handleRestaurantPress]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color={colors.primary} />
          <Text style={styles.locationText}>Delivery to • Home</Text>
          <Ionicons name="chevron-down" size={16} color={colors.textSecondary} />
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <SearchBar
        placeholder="Search for restaurants or dishes"
        onPress={handleSearchPress}
        style={styles.searchBar}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item: Category) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        <View style={styles.offersSection}>
          <Text style={styles.sectionTitle}>Offers</Text>
          <FlatList
            data={offers}
            renderItem={renderOfferItem}
            keyExtractor={(item: Offer) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offersList}
          />
        </View>

        <FlatList
          data={featuredSections}
          renderItem={renderFeaturedSection}
          keyExtractor={(item: FeaturedSection) => item.id}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
}
