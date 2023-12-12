import { useEffect } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchNewAccessToken } from '../store/actions/auth.actions';
import { cookies } from '../utils/cookies';

const PrivateRoutes: React.FC = () => {
  const { accessToken } = useAppSelector((state) => state.auth);

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
