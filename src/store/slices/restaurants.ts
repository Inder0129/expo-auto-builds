import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Restaurant } from '../../types';

interface RestaurantsState {
  restaurants: Restaurant[];
  loading: boolean;
}

const initialState: RestaurantsState = {
  restaurants: [
    {
      id: '1',
      name: 'Pizza Palace',
      cuisine: 'Italian',
      cuisines: ['Italian', 'Pizza'],
      rating: 4.5,
      deliveryTime: '30-40 min',
      deliveryFee: 2.99,
      distance: '1.2',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
      description: 'Authentic Italian pizza with fresh ingredients',
      reviewCount: 1245,
      isFeatured: true,
      categories: ['pizza', 'pasta', 'salads'],
      menuItems: [
        { id: '1', name: 'Margherita Pizza', description: 'Classic tomato and mozzarella', price: 12.99, category: 'pizza' },
        { id: '2', name: 'Pepperoni Pizza', description: 'Spicy pepperoni with cheese', price: 14.99, category: 'pizza' },
        { id: '3', name: 'Garlic Bread', description: 'Freshly baked with garlic butter', price: 4.99, category: 'appetizers' },
      ],
    },
    {
      id: '2',
      name: 'Burger King',
      cuisine: 'American',
      cuisines: ['American', 'Burgers'],
      rating: 4.2,
      deliveryTime: '20-30 min',
      deliveryFee: 1.99,
      distance: '0.8',
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
      description: 'Juicy burgers and crispy fries',
      reviewCount: 892,
      isFeatured: true,
      categories: ['burgers', 'fries', 'drinks'],
      menuItems: [
        { id: '3', name: 'Whopper', description: 'Flame-grilled beef patty', price: 8.99, category: 'burgers' },
        { id: '4', name: 'Cheeseburger', description: 'Classic cheeseburger', price: 6.99, category: 'burgers' },
        { id: '5', name: 'French Fries', description: 'Crispy golden fries', price: 3.99, category: 'fries' },
      ],
    },
  ],
  loading: false,
};

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.restaurants = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setRestaurants, setLoading } = restaurantsSlice.actions;
export const selectRestaurants = (state: { restaurants: RestaurantsState }) => state.restaurants.restaurants;
export default restaurantsSlice.reducer;