import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Restaurant = {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  imageUrl: string;
  cuisine: string;
  isOpen: boolean;
};

type RestaurantsState = {
  list: Restaurant[];
  featured: Restaurant[];
  isLoading: boolean;
  error: string | null;
};

const initialState: RestaurantsState = {
  list: [],
  featured: [],
  isLoading: false,
  error: null,
};

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) => {
      state.list = action.payload;
    },
    setFeatured: (state, action: PayloadAction<Restaurant[]>) => {
      state.featured = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setRestaurants, setFeatured, setLoading, setError } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;