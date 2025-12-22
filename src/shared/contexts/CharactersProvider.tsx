import { useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';

import { CharactersContext, type ICharacterFilters } from './CharactersContext';
import type { ICharacterCard } from '@/widgets';

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
  const [uiFilters, setUiFilters] = useState<ICharacterFilters>(initialFilters);
  const [filters, setFilters] = useState<ICharacterFilters>(initialFilters);

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
      value={{ characters, setCharacters, filters, uiFilters, updateFilter }}
    >
      {children}
    </CharactersContext.Provider>
  );
};
