import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizzas } from './asyncActions';

import { ItemsProp, Status, PizzaSliceState } from './types';

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, // loading, success, error
};

const pizzasSlice = createSlice({
  name: 'pizzasSlice',
  initialState,
  reducers: {
    setItems(state, actions: PayloadAction<ItemsProp[]>) {
      state.items = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.items = action.payload;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
