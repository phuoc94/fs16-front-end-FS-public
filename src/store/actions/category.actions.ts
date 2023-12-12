import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { Category } from '../../types/category.types';
import { CATEGORY_API_URL } from '../../utils/constants';

export const fetchCategories = createAsyncThunk(
  'category/fetchAllCategory',
  async (): Promise<Category[]> => {
    try {
      const response = await axios.get(CATEGORY_API_URL);
      const categories = response.data.map((category: Category) => ({
        ...category,
        id: category._id,
        _id: undefined,
      }));
      return categories;
    } catch (error) {
      throw error;
    }
  },
);

export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async (id: string): Promise<Category> => {
    try {
      const response = await axios.get(`${CATEGORY_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);
