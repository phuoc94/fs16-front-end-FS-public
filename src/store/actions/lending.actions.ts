import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

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

export const returnBooks = createAsyncThunk(
  'lending/returnBooks',
  async (booksIds: string[]): Promise<Boolean> => {
    const body = {
      id: booksIds,
    };
    const response = await axios.post(
      `${PRODUCT_API_URL}/return/`,
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
    const historyWithUUID = response.data.history.map((item: any) => ({
      ...item,
      id: uuidv4(),
    }));

    return historyWithUUID;
  },
);
