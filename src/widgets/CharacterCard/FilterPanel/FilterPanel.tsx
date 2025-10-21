import { useState } from 'react';

import { Select, TextInput } from '@/shared/components';
import IconSearchTextInput from '@/assets/icons/search_icon.svg?react';
import {
  GENDER_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS
} from '@/shared/constants/filterOptions';

import './FilterPanel.scss';

export const FilterPanel = () => {
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');

  return (
    <div className='filters'>
      <TextInput
        placeholder='Filter by name...'
        mode='bordered'
        IconComponent={IconSearchTextInput}
      />

      <Select
        mode='medium'
        placeholder='Species'
        value={species}
        onChange={setSpecies}
        options={SPECIES_OPTIONS}
      />
      <Select
        mode='medium'
        placeholder='Gender'
        value={gender}
        onChange={setGender}
        options={GENDER_OPTIONS}
      />

      <Select
        mode='medium'
        placeholder='Status'
        value={status}
        onChange={setStatus}
        options={STATUS_OPTIONS}
      />
    </div>
  );
};
