import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BooksResponse } from '../types/booksTypes';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1/' }),
  endpoints: (builder) => ({
    getBooks: builder.query<BooksResponse, void>({
      query: () => 'books/',
    }),
  }),
});

export const { useGetBooksQuery } = booksApi;
