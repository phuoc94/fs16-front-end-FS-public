import axios, { AxiosResponse } from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';

import { User } from '../../types/user.types';
import { AUTH_API_URL } from '../../utils/constants';
import { setCookies } from '../../utils/cookies';
import { getAuthHeaders } from '../../utils/getAuthHeaders';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RefreshTokenBody {
  refreshToken: string;
}

interface ApiResponse {
  accessToken: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials) => {
    const response: AxiosResponse<ApiResponse> = await axios.post<ApiResponse>(
      `${AUTH_API_URL}/signin`,
      credentials,
    );

    const { accessToken } = response.data;

    setCookies('accessToken', accessToken, 3600);

    return accessToken;
  },
);

export const fetchNewAccessToken = createAsyncThunk(
  'auth/fetchNewAccessToken',
  async (refreshToken: string) => {
    const body: RefreshTokenBody = {
      refreshToken,
    };

    const response: AxiosResponse<ApiResponse> = await axios.post<ApiResponse>(
      `${AUTH_API_URL}/refresh-token`,
      body,
    );
    const { accessToken } = response.data;

    return accessToken;
  },
);

export const getProfile = createAsyncThunk('auth/getProfile', async () => {
  const response: AxiosResponse<User> = await axios.get<User>(
    `${AUTH_API_URL}/profile`,
    getAuthHeaders(),
  );

  return response.data;
});
