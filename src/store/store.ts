import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import classSlice from './slices/classSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    class: classSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;