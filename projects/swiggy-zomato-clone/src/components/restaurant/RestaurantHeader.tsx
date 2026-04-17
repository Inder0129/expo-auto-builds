import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Restaurant } from '@/src/store/slices/restaurants';
import styles from './restaurant-header.styles';

type RestaurantHeaderProps = {
  restaurant: Restaurant;
};

export function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>{restaurant.rating}</Text>
              <Text style={styles.ratingCount}>({restaurant.reviewCount} reviews)</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Ionicons name="time" size={16} color="#666" />
            <Text style={styles.detailText}>{restaurant.deliveryTime} min</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="cash" size={16} color="#666" />
            <Text style={styles.detailText}>${restaurant.deliveryFee} delivery</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="location" size={16} color="#666" />
            <Text style={styles.detailText}>{restaurant.distance} km</Text>
          </View>
        </View>
        <Text style={styles.description}>{restaurant.description}</Text>
      </View>
    </View>
  );
}
