import { cookies } from './cookies';

export const getAuthHeaders = () => {
  const accessToken = cookies.get('accessToken');
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};
