import { useCallback, useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import type { ICharacterCard } from '@/widgets';
import { getCharacters, getErrorMessage } from '@/shared/api';
import { useDebounce } from './useDebounce';

export const useCharacters = () => {
  const [characters, setCharacters] = useState<ICharacterCard[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  const [filterName, setFilterName] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const debouncedFilterName = useDebounce(filterName, 500);
  const debouncedFilterSpecies = useDebounce(filterSpecies, 500);
  const debouncedFilterGender = useDebounce(filterGender, 500);
  const debouncedFilterStatus = useDebounce(filterStatus, 500);

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

        const { results, hasNextPage } = await getCharacters(page, {
          name: debouncedFilterName,
          species: debouncedFilterSpecies,
          gender: debouncedFilterGender,
          status: debouncedFilterStatus
        });

        setCharacters((prev) => (page === 1 ? results : [...prev, ...results]));

        setHasMore(hasNextPage);

        await new Promise((r) => setTimeout(r, 1000));
      } catch (error) {
        const message = getErrorMessage(error);

        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [
    page,
    debouncedFilterName,
    debouncedFilterSpecies,
    debouncedFilterGender,
    debouncedFilterStatus
  ]);

  useEffect(() => {
    setCharacters([]);
    setPage(1);
  }, [
    debouncedFilterName,
    debouncedFilterSpecies,
    debouncedFilterGender,
    debouncedFilterStatus
  ]);

  return {
    characters,
    hasMore,
    isLoading,
    errorText,

    filterName,
    filterSpecies,
    filterGender,
    filterStatus,

    setPage,
    setFilterName,
    setFilterSpecies,
    setFilterGender,
    setFilterStatus,
    updatedCharacter
  };
};
