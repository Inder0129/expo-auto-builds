import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, Address } from '@/src/types';

interface UserState {
  profile: UserProfile | null;
  addresses: Address[];
  defaultAddress: Address | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  addresses: [],
  defaultAddress: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    },
    setDefaultAddress: (state, action: PayloadAction<Address>) => {
      state.defaultAddress = action.payload;
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action: PayloadAction<Address>) => {
      const index = state.addresses.findIndex(
        (addr: Address) => addr.id === action.payload.id
      );
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      state.addresses = state.addresses.filter(
        (addr: Address) => addr.id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProfile,
  setAddresses,
  setDefaultAddress,
  addAddress,
  updateAddress,
  removeAddress,
  setLoading,
  setError,
} = userSlice.actions;
export default userSlice.reducer;