import { useAppSelector } from './useAppSelector';

export const useIsAdmin = () => {
  const { isLoading, profile } = useAppSelector((state) => state.auth);

  const isAdmin = profile?.role.some((role) => role.title === 'Admin');

  return { isAdmin, isLoading };
};

export const useIsAuthenticated = () => {
  const { isLoading, profile } = useAppSelector((state) => state.auth);

  const isAuthenticated = !!profile;

  return { isAuthenticated, isLoading };
};
