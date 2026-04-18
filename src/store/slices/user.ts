import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, Address } from '@/src/types';

interface UserState {
  profile: UserProfile | null;
  addresses: Address[];
  defaultAddressId: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  addresses: [],
  defaultAddressId: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile(state: UserState, action: PayloadAction<UserProfile | null>) {
      state.profile = action.payload;
    },
    setAddresses(state: UserState, action: PayloadAction<Address[]>) {
      state.addresses = action.payload;
    },
    setDefaultAddress(state: UserState, action: PayloadAction<string | null>) {
      state.defaultAddressId = action.payload;
    },
    addAddress(state: UserState, action: PayloadAction<Address>) {
      state.addresses.push(action.payload);
    },
    updateAddress(state: UserState, action: PayloadAction<Address>) {
      const index = state.addresses.findIndex((addr: Address) => addr.id === action.payload.id);
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    },
    removeAddress(state: UserState, action: PayloadAction<string>) {
      state.addresses = state.addresses.filter((addr: Address) => addr.id !== action.payload);
    },
    setLoading(state: UserState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state: UserState, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setProfile, setAddresses, setDefaultAddress, addAddress, updateAddress, removeAddress, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;