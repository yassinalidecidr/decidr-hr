import { useCallback, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useQueryParams<T extends Record<string, string>>(): readonly [
  T,
  (newParams: Partial<T>, options?: { replace?: boolean }) => void
] {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    const params = {} as T;
    searchParams.forEach((value, key) => {
      params[key as keyof T] = value as T[keyof T];
    });
    return params;
  }, [searchParams]);

  const setQueryParams = useCallback(
    (newParams: Partial<T>, options: { replace?: boolean } = {}) => {
      const current = new URLSearchParams(searchParams);
      
      // Remove params that are undefined or null
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });

      const search = current.toString();
      const query = search ? `?${search}` : '';

      if (options.replace) {
        router.replace(`${pathname}${query}`);
      } else {
        router.push(`${pathname}${query}`);
      }
    },
    [pathname, router, searchParams]
  );

  return [params, setQueryParams] as const;
} 