import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Restaurant } from '@/src/types';

interface RestaurantsState {
  restaurants: Restaurant[];
  featured: Restaurant[];
  isLoading: boolean;
  error: string | null;
}

const initialState: RestaurantsState = {
  restaurants: [],
  featured: [],
  isLoading: false,
  error: null,
};

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setRestaurants(state: RestaurantsState, action: PayloadAction<Restaurant[]>) {
      state.restaurants = action.payload;
    },
    setFeatured(state: RestaurantsState, action: PayloadAction<Restaurant[]>) {
      state.featured = action.payload;
    },
    setLoading(state: RestaurantsState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state: RestaurantsState, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setRestaurants, setFeatured, setLoading, setError } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;