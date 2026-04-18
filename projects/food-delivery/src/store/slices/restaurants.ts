import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Restaurant } from '@/src/types';

interface RestaurantsState {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
}

const initialState: RestaurantsState = {
  restaurants: [],
  selectedRestaurant: null,
};

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.restaurants = action.payload;
    },
    setSelectedRestaurant: (state, action: PayloadAction<Restaurant>) => {
      state.selectedRestaurant = action.payload;
    },
  },
});

export const { setRestaurants, setSelectedRestaurant } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;