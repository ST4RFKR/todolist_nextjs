// hooks/useAuth.ts
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store';

export const useAuth = () => {
  const { isAuthenticated, isInitialized, token, userId } = useSelector(
    (state: RootState) => state.auth
  );

  return {
    isAuthenticated,
    isInitialized,
    token,
    userId,
    isLoading: !isInitialized,
  };
};