import { useEffect, useState } from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';

import { getCharacters, getErrorMessage } from '@/shared/api';
import { useCharactersContext } from '@/shared/contexts/CharactersContext';

export const useCharacters = () => {
  const { filters, setCharacters } = useCharactersContext();

  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        setErrorText('');

        const { results, hasNextPage } = await getCharacters(
          page,
          filters,
          controller.signal
        );

        setCharacters((prev) => (page === 1 ? results : [...prev, ...results]));

        setHasMore(hasNextPage);
      } catch (error) {
        if (
          axios.isCancel(error) ||
          (axios.isAxiosError(error) && error.code === 'ECONNABORTED')
        ) {
          return;
        }

        const message = getErrorMessage(error);
        setErrorText(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();

    return () => {
      controller.abort();
    };
  }, [page, filters, setCharacters]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  return {
    hasMore,
    isLoading,
    errorText,
    setPage
  };
};
