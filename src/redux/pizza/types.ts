export type FetchProp = {
  category: string;
  order: string;
  sortBy: string;
  pizzaTitle: string;
  currentPage: number;
};

export type ItemsProp = {
  id: string;
  title: string;
  type: number[];
  size: number[];
  price: number;
  imageUrl: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: ItemsProp[];
  status: Status;
}
