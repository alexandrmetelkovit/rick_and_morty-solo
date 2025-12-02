import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay = 500) => {
  const [debounced, setDebounced] = useState(value);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    setIsDebouncing(true);

    const handler = setTimeout(() => {
      setDebounced(value);
      setIsDebouncing(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debounced, isDebouncing };
};
