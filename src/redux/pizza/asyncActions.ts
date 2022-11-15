import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FetchProp, ItemsProp } from "./types";

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzas',
  async ({ category, order, sortBy, pizzaTitle, currentPage }: FetchProp) => {
    const { data } = await axios.get<ItemsProp[]>(
      `https://6367cdf8edc85dbc84dc2378.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${pizzaTitle}`,
    );
    return data;
  },
);