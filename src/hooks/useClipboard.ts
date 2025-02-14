import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

interface UseClipboardOptions {
  successDuration?: number;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useClipboard(options: UseClipboardOptions = {}) {
  const { successDuration = 2000, onSuccess, onError } = options;
  const [hasCopied, setHasCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setHasCopied(true);
        toast.success('Copied to clipboard!');
        onSuccess?.();

        setTimeout(() => {
          setHasCopied(false);
        }, successDuration);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to copy');
        toast.error('Failed to copy to clipboard');
        onError?.(error);
      }
    },
    [successDuration, onSuccess, onError]
  );

  return { copy, hasCopied };
} 