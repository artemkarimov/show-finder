import { configureStore } from '@reduxjs/toolkit';

import authReducer, { AuthState } from './slices/auth-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export interface State {
  auth: AuthState;
}

export default store;
