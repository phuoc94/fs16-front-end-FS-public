import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { Author } from '../../types/author.types';
import { AUTHOR_API_URL } from '../../utils/constants'; // You should define this constant for the authors API

export const fetchAuthors = createAsyncThunk(
  'author/fetchAllAuthor',
  async (): Promise<Author[]> => {
    try {
      const response = await axios.get(AUTHOR_API_URL);
      const authors = response.data.map((author: Author) => ({
        ...author,
        id: author._id,
        _id: undefined,
      }));
      return authors;
    } catch (error) {
      throw error;
    }
  },
);

export const fetchAuthor = createAsyncThunk(
  'author/fetchAuthor',
  async (id: string): Promise<Author> => {
    try {
      const response = await axios.get(`${AUTHOR_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);
