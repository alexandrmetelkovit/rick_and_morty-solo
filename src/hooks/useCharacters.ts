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

  const [inputName, setInputName] = useState('');
  const [inputSpecies, setInputSpecies] = useState('');
  const [inputGender, setInputGender] = useState('');
  const [inputStatus, setInputStatus] = useState('');

  const [filterName, setFilterName] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const debouncedSetName = useDebounce((value: string) => {
    setFilterName(value);
  }, 500);

  const debouncedSetSpecies = useDebounce((value: string) => {
    setFilterSpecies(value);
  }, 500);

  const debouncedSetGender = useDebounce((value: string) => {
    setFilterGender(value);
  }, 500);

  const debouncedSetStatus = useDebounce((value: string) => {
    setFilterStatus(value);
  }, 500);

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
          name: filterName,
          species: filterSpecies,
          gender: filterGender,
          status: filterStatus
        });

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
  }, [page, filterName, filterSpecies, filterGender, filterStatus]);

  useEffect(() => {
    setCharacters([]);
    setPage(1);
  }, [filterName, filterSpecies, filterGender, filterStatus]);

  return {
    characters,
    hasMore,
    isLoading,
    errorText,

    inputName,
    inputSpecies,
    inputGender,
    inputStatus,

    filterName,
    filterSpecies,
    filterGender,
    filterStatus,

    setPage,
    setInputName,
    setInputSpecies,
    setInputGender,
    setInputStatus,

    debouncedSetName,
    debouncedSetSpecies,
    debouncedSetGender,
    debouncedSetStatus,

    updatedCharacter
  };
};
