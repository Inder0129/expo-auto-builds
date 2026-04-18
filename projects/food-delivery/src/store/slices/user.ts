import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '@/src/types';

interface UserState {
  profile: UserProfile | null;
  addresses: string[];
}

const initialState: UserState = {
  profile: null,
  addresses: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    setAddresses: (state, action: PayloadAction<string[]>) => {
      state.addresses = action.payload;
    },
    addAddress: (state, action: PayloadAction<string>) => {
      state.addresses.push(action.payload);
    },
  },
});

export const { setProfile, setAddresses, addAddress } = userSlice.actions;
export default userSlice.reducer;