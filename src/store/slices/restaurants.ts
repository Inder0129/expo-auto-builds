import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Restaurant } from '@/src/types';

interface RestaurantsState {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: RestaurantsState = {
  restaurants: [],
  selectedRestaurant: null,
  isLoading: false,
  error: null,
};

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.restaurants = action.payload;
    },
    setSelectedRestaurant: (state, action: PayloadAction<Restaurant | null>) => {
      state.selectedRestaurant = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setRestaurants, setSelectedRestaurant, setLoading, setError } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;