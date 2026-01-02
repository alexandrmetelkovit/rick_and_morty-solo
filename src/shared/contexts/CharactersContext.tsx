import React, { createContext, useContext } from 'react';

import type { ICharacterCard } from '@/widgets';

export interface ICharacterFilters {
  name: string;
  species: string;
  gender: string;
  status: string;
}

export interface ICharactersContextValue {
  characters: ICharacterCard[];
  setCharacters: React.Dispatch<React.SetStateAction<ICharacterCard[]>>;

  updatedCharacter: (updated: Partial<ICharacterCard> & { id: number }) => void;

  filters: ICharacterFilters;
  uiFilters: ICharacterFilters;
  updateFilter: (key: keyof ICharacterFilters, value: string) => void;
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
