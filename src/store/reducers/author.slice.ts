import { createSlice } from '@reduxjs/toolkit';

import { Author } from '../../types/author.types'; // Assuming you have a similar type for authors
import { fetchAuthor, fetchAuthors } from '../actions/author.actions'; // Import the author actions

export interface AuthorState {
  authors: Author[];
  author: Author | null;
  error: string | null | undefined;
  isLoading: boolean;
}

const initialState: AuthorState = {
  authors: [],
  author: null,
  error: null,
  isLoading: false,
};

export const authorSlice = createSlice({
  name: 'author',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuthors.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAuthors.fulfilled, (state, action) => {
      state.authors = action.payload;

      state.isLoading = false;
    });
    builder.addCase(fetchAuthors.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchAuthor.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAuthor.fulfilled, (state, action) => {
      state.author = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAuthor.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default authorSlice.reducer;
