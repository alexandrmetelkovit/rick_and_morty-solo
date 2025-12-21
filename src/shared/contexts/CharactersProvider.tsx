import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';

import type { ICharacterCard } from '@/widgets';
import { useDebounce } from '@/hooks/useDebounce';

import { getCharacters, getErrorMessage } from '../api';
import { CharactersContext, type ICharacterFilters } from './CharactersContext';

const initialFilters: ICharacterFilters = {
  name: '',
  species: '',
  gender: '',
  status: ''
};

export const CharactersProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [characters, setCharacters] = useState<ICharacterCard[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [uiFilters, setUiFilters] = useState<ICharacterFilters>(initialFilters);
  const [filters, setFilters] = useState<ICharacterFilters>(initialFilters);

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
  }, [page, filters]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const debouncedSetFilters = useDebounce<ICharacterFilters>(setFilters, 1500);

  const updateFilter = (key: keyof ICharacterFilters, value: string) => {
    const nextFilters = {
      ...uiFilters,
      [key]: value
    };

    setUiFilters(nextFilters);

    debouncedSetFilters(nextFilters);
  };

  return (
    <CharactersContext.Provider
      value={{
        filters,
        uiFilters,
        characters,
        page,
        isLoading,
        errorText,
        hasMore,
        setPage,
        updatedCharacter,
        updateFilter
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};
