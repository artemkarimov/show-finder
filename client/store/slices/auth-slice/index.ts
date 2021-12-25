import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import User from '@common/interfaces/user';
import { getCurrentUser } from '@api/api-helper';

export interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
}

const initialAuthState: AuthState = { currentUser: null, isAuthenticated: false };

export const getUser = createAsyncThunk('', async () => {
  const response = await getCurrentUser();
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    signIn(state, action) {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    signOut(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(getUser.fulfilled, (state, action) => {
      console.log(action.payload)
      state.currentUser = action.payload;
      state.isAuthenticated = !!action.payload;
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
