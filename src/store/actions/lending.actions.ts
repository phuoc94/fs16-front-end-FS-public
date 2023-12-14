import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { PRODUCT_API_URL } from '../../utils/constants';
import { getAuthHeaders } from '../../utils/getAuthHeaders';

export const borrowBooks = createAsyncThunk(
  'lending/borrowBooks',
  async (booksIds: string[]): Promise<Boolean> => {
    const body = {
      id: booksIds,
    };
    const response = await axios.post(
      `${PRODUCT_API_URL}/borrow/`,
      body,
      getAuthHeaders(),
    );
    return response.data;
  },
);

export const fetchHistory = createAsyncThunk(
  'lending/fetchHistory',
  async (): Promise<any> => {
    const response = await axios.get(
      `${PRODUCT_API_URL}/history/`,
      getAuthHeaders(),
    );
    return response.data.history;
  },
);
