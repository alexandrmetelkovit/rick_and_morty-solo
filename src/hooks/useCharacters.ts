import { getCharacters, getErrorMessage } from '@/shared/api';
import type { ICharacterCard } from '@/widgets';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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

        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [page, filterName, filterSpecies, filterGender, filterStatus]);

  useEffect(() => {
    setPage(1);
  }, [filterName, filterSpecies, filterGender, filterStatus]);

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
