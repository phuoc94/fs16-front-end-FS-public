import { useEffect } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { fetchNewAccessToken } from '../store/actions/auth.actions';
import { cookies } from '../utils/cookies';

const AdminRoutes: React.FC = () => {
  const { accessToken, profile } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const isAdmin = profile?.role === 'admin';

  useEffect(() => {
    const refreshToken = cookies.get('refreshToken');
    if (refreshToken) {
      dispatch(fetchNewAccessToken(refreshToken));
    }
  }, [dispatch]);

  return accessToken && isAdmin ? <Outlet /> : <Navigate to="/signin" />;
};

export default AdminRoutes;
