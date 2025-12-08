import IconSearchTextInput from '@/assets/icons/search_icon.svg?react';
import {
  GENDER_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS
} from '@/shared/constants';

import './FilterPanel.scss';
import { Select, TextInput } from '@/shared/components';

export interface ICharacterFilters {
  name: string;
  species: string;
  gender: string;
  status: string;
}

export interface IFilterPanelProps {
  filters: ICharacterFilters;
  onChangeFilters: (filters: ICharacterFilters) => void;
}

export const FilterPanel = ({
  filters,
  onChangeFilters
}: IFilterPanelProps) => {
  const updateFilter = (key: keyof ICharacterFilters, value: string) => {
    onChangeFilters({
      ...filters,
      [key]: value
    });
  };

  const handleNameChange = (value: string) => {
    updateFilter('name', value);
  };

  const handleSpeciesChange = (value: string) => {
    updateFilter('species', value);
  };

  const handleGenderChange = (value: string) => {
    updateFilter('gender', value);
  };

  const handleStatusChange = (value: string) => {
    updateFilter('status', value);
  };

  return (
    <div className='filterPanel'>
      <TextInput
        value={filters.name}
        placeholder='Filter by name...'
        mode='bordered'
        onChange={handleNameChange}
        IconComponent={IconSearchTextInput}
      />

      <Select
        mode='medium'
        placeholder='Species'
        value={filters.species}
        onChange={handleSpeciesChange}
        options={SPECIES_OPTIONS}
      />
      <Select
        mode='medium'
        placeholder='Gender'
        value={filters.gender}
        onChange={handleGenderChange}
        options={GENDER_OPTIONS}
      />

      <Select
        mode='medium'
        placeholder='Status'
        value={filters.status}
        onChange={handleStatusChange}
        options={STATUS_OPTIONS}
      />
    </div>
  );
};
