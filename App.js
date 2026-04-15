import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CartProvider } from './context/CartContext';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
              else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
              else if (route.name === 'Cart') iconName = focused ? 'cart' : 'cart-outline';
              else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#ff6600',
            tabBarInactiveTintColor: 'gray',
            headerStyle: { backgroundColor: '#fff' },
            headerShadowVisible: false,
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Food Delivery' }} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Cart" component={CartScreen} options={{ tabBarBadge: null }} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}