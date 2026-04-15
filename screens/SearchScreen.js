import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import RestaurantCard from '../components/RestaurantCard';

const allRestaurants = [
  { id: '1', name: 'Pizza Palace', rating: 4.5, deliveryTime: '30 mins', offer: '50% OFF', category: 'Pizza' },
  { id: '2', name: 'Burger King', rating: 4.3, deliveryTime: '25 mins', offer: '30% OFF', category: 'Burger' },
  { id: '3', name: 'Chinese Corner', rating: 4.7, deliveryTime: '35 mins', offer: '20% OFF', category: 'Chinese' },
  { id: '4', name: 'Biryani House', rating: 4.6, deliveryTime: '40 mins', offer: 'Buy 1 Get 1', category: 'Biryani' },
];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  
  const filteredResults = allRestaurants.filter(r => 
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants or cuisines..."
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <FlatList
        data={filteredResults}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  list: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});