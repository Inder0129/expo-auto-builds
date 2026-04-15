import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

const restaurants = [
  { id: 1, name: 'Pizza Palace', cuisine: 'Italian 🍕', time: '30 min', rating: '4.5 ★', price: '$$' },
  { id: 2, name: 'Burger King', cuisine: 'American 🍔', time: '25 min', rating: '4.2 ★', price: '$' },
  { id: 3, name: 'Noodle House', cuisine: 'Asian 🍜', time: '35 min', rating: '4.7 ★', price: '$$' }
];

export default function App() {
  const [selected, setSelected] = useState(null);

  const placeOrder = (id) => {
    setSelected(id);
    Alert.alert('Order Placed!', 'Your food will be delivered soon.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>QuickBite 🚀</Text>
      </View>
      <ScrollView style={styles.list}>
        {restaurants.map(r => (
          <View key={r.id} style={styles.card}>
            <Text style={styles.name}>{r.name}</Text>
            <Text style={styles.cuisine}>{r.cuisine}</Text>
            <View style={styles.row}>
              <Text style={styles.info}>⏱ {r.time}</Text>
              <Text style={styles.info}>⭐ {r.rating}</Text>
              <Text style={styles.info}>💰 {r.price}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => placeOrder(r.id)}>
              <Text style={styles.buttonText}>Order Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#FF4B3A', padding: 20, paddingTop: 50 },
  headerText: { color: 'white', fontSize: 28, fontWeight: 'bold' },
  list: { padding: 15 },
  card: { backgroundColor: 'white', padding: 18, borderRadius: 10, marginBottom: 15, elevation: 2 },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  cuisine: { fontSize: 16, color: '#666', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  info: { fontSize: 14, color: '#888' },
  button: { backgroundColor: '#FF4B3A', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});