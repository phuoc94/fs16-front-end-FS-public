import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Author {
  _id: string;
  firstName: string;
  lastName: string;
}

interface Book {
  _id: string;
  ISBN: string;
  title: string;
  edition: string;
  category: string;
  description: string;
  publisher: string;
  author: Author[];
  img?: string;
}

interface BooksResponse {
  perPage: number;
  page: number;
  totalCount: number;
  totalPageCount: number;
  data: Book[];
}

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
