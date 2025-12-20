import { useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';

import { FiltersContext, type ICharacterFilters } from './FiltersContext';

const initialFilters: ICharacterFilters = {
  name: '',
  species: '',
  gender: '',
  status: ''
};

export const FiltersProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
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
    <FiltersContext.Provider value={{ filters, uiFilters, updateFilter }}>
      {children}
    </FiltersContext.Provider>
  );
};
