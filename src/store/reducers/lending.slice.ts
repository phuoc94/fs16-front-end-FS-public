import { createSlice } from '@reduxjs/toolkit';

import { History } from '../../types/history.types';
import {
  borrowBooks,
  fetchHistory,
  returnBooks,
} from '../actions/lending.actions';

export interface LendingState {
  myLoans: History[];
  error: string | null | undefined;
  isLoading: boolean;
}

const initialState: LendingState = {
  myLoans: [],
  error: null,
  isLoading: false,
};

export const lendingSlice = createSlice({
  name: 'lending',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHistory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHistory.fulfilled, (state, action) => {
      state.myLoans = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchHistory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(borrowBooks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(borrowBooks.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(borrowBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(returnBooks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(returnBooks.fulfilled, (state, action) => {
      const bookIds = action.payload;

      bookIds.forEach((id: string) => {
        const index = state.myLoans.findIndex(
          (loan) => loan.book._id === id && loan.returned === false,
        );

        if (index !== -1) {
          state.myLoans[index].returned = true;
          state.myLoans[index].returned_Date = new Date().toISOString();
        }
      });

      state.isLoading = false;
    });

    builder.addCase(returnBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default lendingSlice.reducer;
