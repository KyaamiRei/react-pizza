import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import cart from './slices/cartSlice';
import filterSlice from './slices/filterSlice';
import pizzasSlice from './slices/pizzasSlice';

export const store = configureStore({
  reducer: { cart, filterSlice, pizzasSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
