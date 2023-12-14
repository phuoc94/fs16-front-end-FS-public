import { useEffect } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { useIsAdmin } from '../hooks/useAuth';
import { fetchNewAccessToken } from '../store/actions/auth.actions';
import { cookies } from '../utils/cookies';

const AdminRoutes: React.FC = () => {
  const accessToken = cookies.get('accessToken');
  const dispatch = useAppDispatch();
  const { isAdmin, isLoading } = useIsAdmin();
  console.log('🚀 ~ file: AdminRoutes.tsx:14 ~ isLoading:', isLoading);

  useEffect(() => {
    const refreshToken = cookies.get('refreshToken');
    if (refreshToken) {
      dispatch(fetchNewAccessToken(refreshToken));
    }
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return accessToken && isAdmin ? <Outlet /> : <Navigate to="/signin" />;
};

export default AdminRoutes;
