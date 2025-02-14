import { useCallback, useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

interface UseInfiniteScrollOptions<T> {
  fetchMore: (page: number) => Promise<T[]>;
  initialData?: T[];
  threshold?: number;
}

export function useInfiniteScroll<T>({
  fetchMore,
  initialData = [],
  threshold = 0.5,
}: UseInfiniteScrollOptions<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(1);

  const [setRef, isIntersecting] = useIntersectionObserver({
    threshold,
    rootMargin: '100px',
  });

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const newItems = await fetchMore(page.current);
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setData(prev => [...prev, ...newItems]);
        page.current += 1;
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load more items'));
    } finally {
      setLoading(false);
    }
  }, [fetchMore, hasMore, loading]);

  useEffect(() => {
    if (isIntersecting) {
      loadMore();
    }
  }, [isIntersecting, loadMore]);

  return {
    data,
    loading,
    error,
    hasMore,
    setRef,
    refresh: useCallback(() => {
      page.current = 1;
      setData([]);
      setHasMore(true);
      loadMore();
    }, [loadMore]),
  };
} 