import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, register, logout, clearError } from '@/store/features/auth/authSlice';
import type { LoginCredentials, RegisterCredentials } from '@/types/user';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, token, loading, error } = useAppSelector(state => state.auth);

  const handleLogin = useCallback(async (credentials: LoginCredentials) => {
    try {
      console.log('Login attempt with:', credentials);
      const result = await dispatch(login(credentials)).unwrap();
      console.log('Login response:', result);
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  }, [dispatch]);

  const handleRegister = useCallback(async (credentials: RegisterCredentials) => {
    try {
      await dispatch(register(credentials)).unwrap();
    } catch (err) {
      throw err;
    }
  }, [dispatch]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Log state changes
  useEffect(() => {
    console.log('Auth state updated:', { user, token, loading, error });
  }, [user, token, loading, error]);

  return {
    user,
    token,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    clearError: handleClearError,
  };
} 