import { Select, TextInput } from '@/shared/components';
import IconSearchTextInput from '@/assets/icons/search_icon.svg?react';
import {
  GENDER_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS
} from '@/shared/constants';

import './FilterPanel.scss';

export interface IFilterPanelProps {
  name: string;
  species: string;
  gender: string;
  status: string;
  onChangeName: (value: string) => void;
  onChangeSpecies: (value: string) => void;
  onChangeGender: (value: string) => void;
  onChangeStatus: (value: string) => void;
}

export const FilterPanel = ({
  name,
  species,
  gender,
  status,
  onChangeName,
  onChangeSpecies,
  onChangeGender,
  onChangeStatus
}: IFilterPanelProps) => {
  const handleSpeciesChange = (value: string) => {
    onChangeSpecies(value);
  };
  const handleGenderChange = (value: string) => {
    onChangeGender(value);
  };
  const handleStatusChange = (value: string) => {
    onChangeStatus(value);
  };

  return (
    <div className='filterPanel'>
      <TextInput
        value={name}
        placeholder='Filter by name...'
        mode='bordered'
        onChange={onChangeName}
        IconComponent={IconSearchTextInput}
      />

      <Select
        mode='medium'
        placeholder='Species'
        value={species}
        onChange={handleSpeciesChange}
        options={SPECIES_OPTIONS}
      />
      <Select
        mode='medium'
        placeholder='Gender'
        value={gender}
        onChange={handleGenderChange}
        options={GENDER_OPTIONS}
      />

      <Select
        mode='medium'
        placeholder='Status'
        value={status}
        onChange={handleStatusChange}
        options={STATUS_OPTIONS}
      />
    </div>
  );
};
