import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RestaurantCard from '../components/RestaurantCard';
import CategorySlider from '../components/CategorySlider';

const restaurants = [
  { id: '1', name: 'Pizza Palace', rating: 4.5, deliveryTime: '30 mins', offer: '50% OFF', category: 'Pizza' },
  { id: '2', name: 'Burger King', rating: 4.3, deliveryTime: '25 mins', offer: '30% OFF', category: 'Burger' },
  { id: '3', name: 'Chinese Corner', rating: 4.7, deliveryTime: '35 mins', offer: '20% OFF', category: 'Chinese' },
  { id: '4', name: 'Biryani House', rating: 4.6, deliveryTime: '40 mins', offer: 'Buy 1 Get 1', category: 'Biryani' },
  { id: '5', name: 'Salad Story', rating: 4.2, deliveryTime: '20 mins', offer: 'Free Delivery', category: 'Healthy' },
  { id: '6', name: 'Ice Cream Parlor', rating: 4.8, deliveryTime: '15 mins', offer: '40% OFF', category: 'Desserts' },
];

const categories = ['Pizza', 'Burger', 'Chinese', 'Biryani', 'Healthy', 'Desserts'];

export default function HomeScreen() {
  const navigation = useNavigation();

  const filteredRestaurants = (category) => {
    if (!category) return restaurants;
    return restaurants.filter(r => r.category === category);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order Food Online</Text>
        <Text style={styles.headerSubtitle}>Your favorite restaurants, delivered</Text>
      </View>
      
      <CategorySlider categories={categories} />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Restaurants</Text>
        <FlatList
          data={restaurants}
          renderItem={({ item }) => <RestaurantCard restaurant={item} />}
          keyExtractor={item => item.id}
          horizontal={false}
          numColumns={2}
          columnWrapperStyle={styles.row}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  section: {
    padding: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 10,
    color: '#333',
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});