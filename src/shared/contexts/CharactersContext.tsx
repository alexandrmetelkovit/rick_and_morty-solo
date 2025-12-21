import React, { createContext, useContext } from 'react';

import type { ICharacterCard } from '@/widgets';

export interface ICharacterFilters {
  name: string;
  species: string;
  gender: string;
  status: string;
}

export interface ICharactersContextValue {
  filters: ICharacterFilters;
  uiFilters: ICharacterFilters;
  updateFilter: (key: keyof ICharacterFilters, value: string) => void;

  characters: ICharacterCard[];
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  errorText: string;

  setPage: React.Dispatch<React.SetStateAction<number>>;
  updatedCharacter: (updated: Partial<ICharacterCard> & { id: number }) => void;
}

export const CharactersContext = createContext<ICharactersContextValue | null>(
  null
);

export const useCharactersContext = () => {
  const context = useContext(CharactersContext);

  if (!context) {
    throw new Error('useFilters must ne used inside FiltersProvider');
  }

  return context;
};
