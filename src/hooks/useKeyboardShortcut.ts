import { useEffect, useCallback } from 'react';

type KeyHandler = (event: KeyboardEvent) => void;

interface ShortcutOptions {
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
}

export function useKeyboardShortcut(
  key: string,
  callback: KeyHandler,
  options: ShortcutOptions = {}
) {
  const handler = useCallback(
    (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        !!options.ctrl === event.ctrlKey &&
        !!options.alt === event.altKey &&
        !!options.shift === event.shiftKey &&
        !!options.meta === event.metaKey
      ) {
        event.preventDefault();
        callback(event);
      }
    },
    [callback, key, options]
  );

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);
} 