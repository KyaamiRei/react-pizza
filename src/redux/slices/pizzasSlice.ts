import axios from 'axios';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type FetchProp = {
  category: string;
  order: string;
  sortBy: string;
  pizzaTitle: string;
  currentPage: number;
};

type ItemsProp = {
  id: string;
  title: string;
  type: number[];
  size: number[];
  price: number;
  imageUrl: string;
};

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async ({ category, order, sortBy, pizzaTitle, currentPage }: FetchProp) => {
    const { data } = await axios.get<ItemsProp[]>(
      `https://6367cdf8edc85dbc84dc2378.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${pizzaTitle}`,
    );
    return data;
  },
);

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: ItemsProp[];
  status: Status;
}

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

export const selectPizzas = (state: RootState) => state.pizzasSlice;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
