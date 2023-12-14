import { createSlice } from '@reduxjs/toolkit';

import { Product } from '../../types/product.types';

export type CartState = {
  cartItems: Product[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  error: string | undefined | null;
};

const initialState: CartState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: { payload: { product: Product } }) => {
      const { product } = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === product.id);

      if (index === -1) {
        state.cartItems.push(product);
        state.totalItems += 1;
      }
    },
    removeItemFromCart: (state, action: { payload: { id: string } }) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.totalItems -= 1;
        state.cartItems.splice(index, 1);
      }
    },
    removeAllItemsFromCart: (state) => {
      state.cartItems = [];
      state.totalItems = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, removeAllItemsFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
