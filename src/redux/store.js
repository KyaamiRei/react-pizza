import { configureStore } from '@reduxjs/toolkit';

import cart from './slices/cartSlice';
import filterSlice from './slices/filterSlice';
import pizzasSlice from './slices/pizzasSlice';

export const store = configureStore({
  reducer: { cart, filterSlice, pizzasSlice },
});
