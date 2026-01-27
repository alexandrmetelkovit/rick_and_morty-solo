import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';

import { getCharacters } from '@/shared/api';
import { useCharactersContext } from '@/shared/contexts/CharactersContext';
import type { ICharacterCard } from '@/widgets';

type TCharactersResponse = {
  results: ICharacterCard[];
  hasNextPage: boolean;
};

export const useCharacters = () => {
  const { filters } = useCharactersContext();

  return useInfiniteQuery<
    TCharactersResponse,
    Error,
    InfiniteData<TCharactersResponse>,
    ['characters', typeof filters],
    number
  >({
    queryKey: ['characters', filters],
    initialPageParam: 1,
    queryFn: ({ pageParam, signal }) =>
      getCharacters(pageParam, filters, signal),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasNextPage ? allPages.length + 1 : undefined
  });
};
