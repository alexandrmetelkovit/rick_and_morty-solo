import { createContext, useContext } from 'react';

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
