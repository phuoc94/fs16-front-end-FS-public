import { createSlice } from '@reduxjs/toolkit';

import { Category } from '../../types/category.types';
import { fetchCategories, fetchCategory } from '../actions/category.actions';

export interface CategoryState {
  categories: Category[];
  category: Category | null;
  error: string | null | undefined;
  isLoading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  error: null,
  isLoading: false,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      const newCategories: Category[] = [];

      action.payload.forEach((category) => {
        if (
          !newCategories.find(
            (newCategory) => newCategory.name === category.name,
          )
        ) {
          newCategories.push(category);
        }
      });

      state.categories = newCategories;

      state.isLoading = false;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.category = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default categorySlice.reducer;
