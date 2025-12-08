import { useCallback, useEffect, useRef } from 'react';

export const useDebounce = <T>(callback: (value: T) => void, delay: number) => {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (value: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => callback(value), delay);
    },
    [callback, delay]
  );
};
