import { useCallback, useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import type { ICharacterCard, ICharacterFilters } from '@/widgets';
import { getCharacters, getErrorMessage } from '@/shared/api';
import { useDebounce } from './useDebounce';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<ICharacterCard[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  const [uiFilters, setUiFilters] = useState({
    name: '',
    species: '',
    gender: '',
    status: ''
  });

  const [filters, setFilters] = useState({
    name: '',
    species: '',
    gender: '',
    status: ''
  });

  const debouncedSetFilters = useDebounce<ICharacterFilters>((nextFilters) => {
    setFilters(nextFilters);
  }, 500);

  const handleFilterChange = (nextFilters: ICharacterFilters) => {
    setUiFilters(nextFilters);
    debouncedSetFilters(nextFilters);
  };

  const updatedCharacter = useCallback(
    (updated: Partial<ICharacterCard> & { id: number }) => {
      setCharacters((prev) =>
        prev.map((character) =>
          character.id === updated.id ? { ...character, ...updated } : character
        )
      );
    },
    []
  );

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        setErrorText('');

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const { results, hasNextPage } = await getCharacters(page, filters);

        setCharacters((prev) => (page === 1 ? results : [...prev, ...results]));

        setHasMore(hasNextPage);

        await new Promise((r) => setTimeout(r, 1000));
      } catch (error) {
        const message = getErrorMessage(error);
        setErrorText(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [page, filters]);

  useEffect(() => {
    setCharacters([]);
    setPage(1);
  }, [filters]);

  return {
    characters,
    hasMore,
    isLoading,
    errorText,

    uiFilters,
    onChangeFilters: handleFilterChange,

    setPage,
    updatedCharacter
  };
};
