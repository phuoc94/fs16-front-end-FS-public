import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { Copy, Product } from '../../types/product.types';
import { PRODUCT_API_URL } from '../../utils/constants';
import { getAuthHeaders } from '../../utils/getAuthHeaders';

export interface AddProductRequest {
  title: string;
  description: string;
  category: string;
  img: string;
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
    id: string;
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
    const copies = await axios.get(`${PRODUCT_API_URL}/copy`);

    const products = response.data.data.map((product: Product) => {
      const availableCopies = copies.data.filter(
        (copy: Copy) =>
          copy.book_id === product._id && copy.is_Available === true,
      ).length;

      return {
        ...product,
        id: product._id,
        _id: undefined,
        availableCopies: availableCopies,
      };
    });

    return products;
  },
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (productId: string): Promise<Product> => {
    const response = await axios.get(`${PRODUCT_API_URL}/${productId}`);

    const product = { ...response.data, id: response.data._id, _id: undefined };

    return product;
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
  async (id: string) => {
    try {
      await axios.delete(`${PRODUCT_API_URL}/${id}`);
      return id;
    } catch (error) {
      throw error;
    }
  },
);
