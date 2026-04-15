import React from 'react';
import { SafeAreaView, Text, FlatList, View, StyleSheet } from 'react-native';

type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: string;
  eta: string;
};

const restaurants: Restaurant[] = [
  { id: '1', name: 'Pizza Palace', cuisine: 'Italian', rating: '4.5', eta: '30 min' },
  { id: '2', name: 'Burger King', cuisine: 'American', rating: '4.2', eta: '25 min' },
  { id: '3', name: 'Sushi Master', cuisine: 'Japanese', rating: '4.7', eta: '35 min' },
  { id: '4', name: 'Taco Town', cuisine: 'Mexican', rating: '4.3', eta: '20 min' },
  { id: '5', name: 'Curry House', cuisine: 'Indian', rating: '4.6', eta: '40 min' }
];

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Food Delivery</Text>
      <FlatList
        data={restaurants}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.info}>{item.cuisine} ⭐ {item.rating} • {item.eta}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', padding: 16, backgroundColor: '#fff' },
  card: { backgroundColor: '#fff', padding: 16, margin: 8, borderRadius: 8 },
  name: { fontSize: 18, fontWeight: 'bold' },
  info: { color: '#666', marginTop: 4 }
});