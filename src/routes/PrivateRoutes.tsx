import { useEffect } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchNewAccessToken } from '../store/actions/auth.actions';
import { cookies } from '../utils/cookies';

const PrivateRoutes: React.FC = () => {
  const accessToken = cookies.get('accessToken');

  const dispatch = useAppDispatch();

  useEffect(() => {
    const refreshToken = cookies.get('refreshToken');
    if (refreshToken) {
      dispatch(fetchNewAccessToken(refreshToken));
    }
  }, [dispatch]);

  return accessToken ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoutes;
