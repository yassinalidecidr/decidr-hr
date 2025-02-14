import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

interface UseApiOptions {
  onError?: (error: Error) => void;
  showErrorToast?: boolean;
}

export function useApi<T extends (...args: any[]) => Promise<any>>(
  apiFunction: T,
  { onError, showErrorToast = true }: UseApiOptions = {}
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: Parameters<T>) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiFunction(...args);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An error occurred');
        setError(error);
        if (showErrorToast) {
          toast.error(error.message);
        }
        if (onError) {
          onError(error);
        }
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction, onError, showErrorToast]
  );

  return {
    execute,
    loading,
    error,
  };
} 