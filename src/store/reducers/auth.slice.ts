import { createSlice } from '@reduxjs/toolkit';

import { User } from '../../types/user.types';
import { cookies, removeCookies } from '../../utils/cookies';
import {
  fetchNewAccessToken,
  getProfile,
  login,
} from '../actions/auth.actions';

export interface AuthState {
  accessToken: string | null;
  profile: User | null;
  isLoading: boolean;
  error: string | undefined | null;
}

const initialState: AuthState = {
  accessToken: null,
  profile: null,
  isLoading: true,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      removeCookies('refreshToken');
      removeCookies('accessToken');
      state.accessToken = null;
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getProfile.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        const accessToken = cookies.get('accessToken');
        state.accessToken = accessToken;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchNewAccessToken.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchNewAccessToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload;
      })
      .addCase(fetchNewAccessToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
