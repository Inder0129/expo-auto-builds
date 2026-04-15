import React, { useState, useMemo } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  eta: string;
  price: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

const restaurants: Restaurant[] = [
  { id: '1', name: 'Burger Palace', image: 'https://picsum.photos/400/200?random=1', cuisine: 'American • Fast Food', rating: 4.5, eta: '25 min', price: '$$', category: 'Burgers' },
  { id: '2', name: 'Pizza Corner', image: 'https://picsum.photos/400/200?random=2', cuisine: 'Italian • Pizza', rating: 4.8, eta: '30 min', price: '$$$', category: 'Pizza' },
  { id: '3', name: 'Sushi Master', image: 'https://picsum.photos/400/200?random=3', cuisine: 'Japanese • Sushi', rating: 4.9, eta: '35 min', price: '$$$$', category: 'Sushi' },
  { id: '4', name: 'Taco Fiesta', image: 'https://picsum.photos/400/200?random=4', cuisine: 'Mexican • Tacos', rating: 4.3, eta: '20 min', price: '$$', category: 'Mexican' },
];

const categories: Category[] = [
  { id: '1', name: 'Burgers', icon: 'hamburger' },
  { id: '2', name: 'Pizza', icon: 'pizza' },
  { id: '3', name: 'Sushi', icon: 'food' },
  { id: '4', name: 'Mexican', icon: 'taco' },
  { id: '5', name: 'Desserts', icon: 'cupcake' },
  { id: '6', name: 'Healthy', icon: 'leaf' },
];

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const filteredRestaurants = useMemo(() => {
    let list = restaurants;
    if (selectedCategory) list = list.filter(r => r.category === selectedCategory);
    if (searchQuery.trim()) {
      list = list.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.cuisine.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return list;
  }, [selectedCategory, searchQuery]);

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.headerTitle}>MunchBox</Text>
        <Text style={s.headerSubtitle}>Order food from your favorite restaurants</Text>
      </View>

      <View style={s.searchContainer}>
        <MaterialCommunityIcons name='magnify' size={24} color='#666' />
        <TextInput style={s.searchInput} placeholder='Search restaurants or cuisines' value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.categoriesContainer}
        renderItem={({ item }) => {
          const isActive = selectedCategory === item.name;
          return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => setSelectedCategory(isActive ? null : item.name)} style={[s.categoryItem, isActive && s.activeCategory]}>
              <MaterialCommunityIcons name={item.icon} size={24} color={isActive ? '#fff' : '#666'} />
              <Text style={[s.categoryText, isActive && s.activeCategoryText]}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <FlatList
        data={filteredRestaurants}
        keyExtractor={item => item.id}
        contentContainerStyle={s.restaurantsList}
        renderItem={({ item }) => (
          <View style={s.card}>
            <Image source={{ uri: item.image }} style={s.image} />
            <View style={s.info}>
              <Text style={s.name}>{item.name}</Text>
              <Text style={s.cuisine}>{item.cuisine}</Text>
              <View style={s.meta}>
                <View style={s.rating}>
                  <MaterialCommunityIcons name='star' size={18} color='#FFD700' />
                  <Text style={s.ratingText}>{item.rating}</Text>
                  <Text style={s.eta}> • {item.eta}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={s.orderBtn} onPress={() => { setCartCount(c => c + 1); showToast('Added to cart!'); }}>
                  <Text style={s.orderBtnText}>Order Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {cartCount > 0 && (
        <TouchableOpacity activeOpacity={0.9} style={s.cartBtn} onPress={() => showToast('Proceeding to checkout')}>
          <MaterialCommunityIcons name='cart' size={28} color='#fff' />
          <View style={s.cartBadge}><Text style={s.badgeText}>{cartCount}</Text></View>
        </TouchableOpacity>
      )}

      {toast && (
        <View style={s.toastContainer} pointerEvents='none'>
          <View style={s.toast}><Text style={s.toastText}>{toast}</Text></View>
        </View>
      )}
    </View>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { paddingHorizontal: 16, paddingTop: 60, paddingBottom: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#ff4757' },
  headerSubtitle: { fontSize: 14, color: '#666', marginTop: 4 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16, backgroundColor: '#fff' },
  searchInput: { flex: 1, height: 40, backgroundColor: '#f5f5f5', borderRadius: 8, paddingHorizontal: 12 },
  categoriesContainer: { paddingHorizontal: 16, paddingVertical: 8, gap: 16 },
  categoryItem: { alignItems: 'center', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 24, backgroundColor: '#f5f5f5' },
  activeCategory: { backgroundColor: '#ff4757' },
  categoryText: { marginTop: 6, fontSize: 13, fontWeight: '600', color: '#666' },
  activeCategoryText: { color: '#fff' },
  restaurantsList: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 100, gap: 12 },
  card: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  image: { width: '100%', height: 160 },
  info: { padding: 12 },
  name: { fontSize: 18, fontWeight: 'bold', color: '#222', marginBottom: 4 },
  cuisine: { fontSize: 14, color: '#666', marginBottom: 8 },
  meta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ratingText: { fontWeight: 'bold', color: '#222' },
  eta: { color: '#888', fontSize: 14 },
  orderBtn: { backgroundColor: '#ff4757', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  orderBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  cartBtn: { position: 'absolute', bottom: 30, right: 20, width: 64, height: 64, borderRadius: 32, backgroundColor: '#ff4757', alignItems: 'center', justifyContent: 'center', elevation: 6, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
  cartBadge: { position: 'absolute', top: -6, right: -6, minWidth: 24, height: 24, borderRadius: 12, backgroundColor: '#ff9500', alignItems: 'center', justifyContent: 'center' },
  badgeText: { color: '#fff', fontWeight: 'bold', fontSize: 12, paddingHorizontal: 6 },
  toastContainer: { position: 'absolute', left: 0, right: 0, top: '45%', alignItems: 'center' },
  toast: { backgroundColor: '#333', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 24 },
  toastText: { color: '#fff', fontWeight: '600' },
});

export default App;