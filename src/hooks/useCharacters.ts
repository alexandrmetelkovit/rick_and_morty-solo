import { useCharactersContext } from '@/shared/contexts';

export const useCharacters = () => {
  const {
    characters,
    hasMore,
    isLoading,
    errorText,
    setPage,
    updatedCharacter
  } = useCharactersContext();

  return {
    characters,
    hasMore,
    isLoading,
    errorText,
    setPage,
    updatedCharacter
  };
};
