import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { Category } from '../../types/category.types';
import { CATEGORY_API_URL } from '../../utils/constants';

export const fetchCategories = createAsyncThunk(
  'category/fetchAllCategory',
  async (): Promise<Category[]> => {
    try {
      const response = await axios.get(CATEGORY_API_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async (id: number): Promise<Category> => {
    try {
      const response = await axios.get(`${CATEGORY_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);
