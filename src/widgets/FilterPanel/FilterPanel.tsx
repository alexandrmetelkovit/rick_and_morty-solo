import { useCharactersContext } from '@/shared/contexts';
import { Select, TextInput } from '@/shared/components';
import IconSearchTextInput from '@/assets/icons/search_icon.svg?react';
import {
  GENDER_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS
} from '@/shared/constants';

import './FilterPanel.scss';

export const FilterPanel = () => {
  const { uiFilters, updateFilter } = useCharactersContext();

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
        value={uiFilters.name}
        placeholder='Filter by name...'
        mode='bordered'
        onChange={handleNameChange}
        IconComponent={IconSearchTextInput}
      />

      <Select
        mode='medium'
        placeholder='Species'
        value={uiFilters.species}
        onChange={handleSpeciesChange}
        options={SPECIES_OPTIONS}
      />
      <Select
        mode='medium'
        placeholder='Gender'
        value={uiFilters.gender}
        onChange={handleGenderChange}
        options={GENDER_OPTIONS}
      />

      <Select
        mode='medium'
        placeholder='Status'
        value={uiFilters.status}
        onChange={handleStatusChange}
        options={STATUS_OPTIONS}
      />
    </div>
  );
};
