import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Restaurant } from '../../types';

interface RestaurantsState {
  list: Restaurant[];
  isLoading: boolean;
}

const initialState: RestaurantsState = {
  list: [
    {
      id: '1',
      name: 'Burger King',
      cuisine: 'Fast Food',
      rating: 4.2,
      deliveryTime: '20-30 min',
      imageUrl: '',
      menu: [],
    },
    {
      id: '2',
      name: 'Pizza Hut',
      cuisine: 'Italian',
      rating: 4.5,
      deliveryTime: '25-35 min',
      imageUrl: '',
      menu: [],
    },
  ],
  isLoading: false,
};

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setRestaurants } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;