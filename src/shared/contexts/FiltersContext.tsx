import { createContext, useContext } from 'react';

export interface ICharacterFilters {
  name: string;
  species: string;
  gender: string;
  status: string;
}

export interface IFilterContextValue {
  filters: ICharacterFilters;
  uiFilters: ICharacterFilters;
  updateFilter: (key: keyof ICharacterFilters, value: string) => void;
}

export const FiltersContext = createContext<IFilterContextValue | null>(null);

export const useFilters = () => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error('useFilters must ne used inside FiltersProvider');
  }

  return context;
};
