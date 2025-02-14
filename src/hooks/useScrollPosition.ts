import { useState, useEffect } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
  isScrollingUp: boolean;
  isScrollingDown: boolean;
}

export function useScrollPosition(): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    isScrollingUp: false,
    isScrollingDown: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      setScrollPosition({
        x: window.scrollX,
        y: currentScrollY,
        isScrollingUp: currentScrollY < lastScrollY,
        isScrollingDown: currentScrollY > lastScrollY,
      });
      lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
} 