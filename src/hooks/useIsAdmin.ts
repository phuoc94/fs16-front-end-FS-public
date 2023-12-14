import { useAppSelector } from './useAppSelector';

export const useIsAdmin = () => {
  const { profile } = useAppSelector((state) => state.auth);

  const isAdmin = profile?.role.some((role) => role.title === 'Admin');

  return isAdmin;
};
