import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/src/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state: AuthState, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
    setToken(state: AuthState, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setLoading(state: AuthState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state: AuthState, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    logout(state: AuthState) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setToken, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;