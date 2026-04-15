import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function RestaurantCard({ restaurant }) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.imageText}>{restaurant.name[0]}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <View style={styles.details}>
          <Text style={styles.rating}>★ {restaurant.rating}</Text>
          <Text style={styles.time}>{restaurant.deliveryTime}</Text>
        </View>
        <Text style={styles.offer}>{restaurant.offer}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#ff6600',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  rating: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  offer: {
    fontSize: 12,
    color: '#ff6600',
    fontWeight: '600',
  },
});