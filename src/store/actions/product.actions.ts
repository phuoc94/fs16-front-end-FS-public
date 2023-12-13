import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { Product } from '../../types/product.types';
import { PRODUCT_API_URL } from '../../utils/constants';
import { getAuthHeaders } from '../../utils/getAuthHeaders';

export interface AddProductRequest {
  title: string;
  description: string;
  category: string;
  images: string;
}

export interface ProductFilter {
  categoryName?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filter?: 0 | 1;
}

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product: AddProductRequest): Promise<Product> => {
    const response = await axios.post(
      PRODUCT_API_URL,
      product,
      getAuthHeaders(),
    );
    return response.data;
  },
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({
    product,
    id,
  }: {
    product: AddProductRequest;
    id: number;
  }): Promise<Product> => {
    const response = await axios.put(`${PRODUCT_API_URL}/${id}`, product);
    return response.data;
  },
);

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters?: ProductFilter): Promise<Product[]> => {
    if (!filters) {
      filters = {
        filter: 0,
      };
    }

    filters.filter = 1;

    const response = await axios.get(PRODUCT_API_URL, { params: filters });
    return response.data.data;
  },
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (productId: string): Promise<Product> => {
    const response = await axios.get(`${PRODUCT_API_URL}/${productId}`);
    return response.data;
  },
);

export const fetchCategoryProducts = createAsyncThunk(
  'products/fetchCategoryProducts',
  async (name: string): Promise<Product[]> => {
    const response = await axios.get(
      `${PRODUCT_API_URL}/?filter=1&categoryName=${name}`,
    );
    return response.data;
  },
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: number) => {
    try {
      await axios.delete(`${PRODUCT_API_URL}/${id}`);
      return id;
    } catch (error) {
      throw error;
    }
  },
);
