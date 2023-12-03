import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: string[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      const bookId = action.payload;
      if (!state.items.includes(bookId)) {
        state.items.push(bookId);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
