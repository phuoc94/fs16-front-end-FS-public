import { createSlice } from '@reduxjs/toolkit';

import { Product } from '../../types/product.types';

export type Item = Product & {
  quantity: number;
};

export type CartState = {
  cartItems: Item[];
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
    addItemToCart: (
      state,
      action: { payload: { product: Product; quantity?: number } },
    ) => {
      const { product, quantity } = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === product.id);
      const newQuantity = quantity ? quantity : 1;
      if (index !== -1) {
        state.cartItems[index].quantity += newQuantity;
      } else {
        state.cartItems.push({ ...product, quantity: newQuantity });
      }
      state.totalItems += newQuantity;
      state.totalPrice += product.price * newQuantity;
    },
    removeItemFromCart: (state, action: { payload: { id: number } }) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.totalItems -= state.cartItems[index].quantity;
        state.totalPrice -=
          state.cartItems[index].quantity * state.cartItems[index].price;
        state.cartItems.splice(index, 1);
      }
    },
    increaseItemQuantity: (state, action: { payload: { id: number } }) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.cartItems[index].quantity += 1;
        state.totalItems++;
        state.totalPrice += state.cartItems[index].price;
      }
    },
    decreaseItemQuantity: (state, action: { payload: { id: number } }) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.cartItems[index].quantity -= 1;
        state.totalItems--;
        state.totalPrice -= state.cartItems[index].price;
      }
    },
    setItemQuantity: (
      state,
      action: { payload: { id: number; quantity: number } },
    ) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex];
        const quantityDifference = quantity - item.quantity;

        item.quantity = quantity;
        state.totalItems += quantityDifference;
        state.totalPrice += quantityDifference * item.price;
      }
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  setItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
