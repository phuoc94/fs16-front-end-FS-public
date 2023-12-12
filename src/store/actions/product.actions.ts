import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { Product } from '../../types/product.types';
import { CATEGORY_API_URL, PRODUCT_API_URL } from '../../utils/constants';

export interface AddProductRequest {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface ProductFilter {
  categoryId?: number;
  price_min?: number;
  price_max?: number;
}

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product: AddProductRequest): Promise<Product> => {
    const response = await axios.post(PRODUCT_API_URL, product);
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
      filters = {};
    }

    if (filters.price_min === undefined) {
      filters.price_min = 1;
    }
    if (filters.price_max === undefined) {
      filters.price_max = 9999999999;
    }

    const response = await axios.get(PRODUCT_API_URL, { params: filters });
    return response.data;
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
  async (id: number): Promise<Product[]> => {
    const response = await axios.get(`${CATEGORY_API_URL}/${id}/products`);
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
