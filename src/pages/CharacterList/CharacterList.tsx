import { TextInput } from '@/shared/components';
import { Select } from '@/shared/components/Select/Select';
import bannerImg from '@/assets/images/page-content/banner.png';
import IconSearchTextInput from '@/assets/icons/search_icon.svg?react';

import {
  GENDER_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS
} from '@/shared/constants/filterOptions';

import './CharacterList.scss';
import {
  CharacterCard,
  type ICharacterCardProps
} from '@/widgets/CharacterCard/CharacterCard';
import { useState } from 'react';

export const CharactersList = () => {
  const [species, setSpecies] = useState('');
  const [gender, setGender] = useState('');
  const [status, setStatus] = useState('');

  const characters: ICharacterCardProps[] = [
    {
      name: 'Rick Sanchez',
      gender: 'male',
      species: 'human',
      location: 'earth',
      status: 'alive'
    }
  ];

  return (
    <div className='characters container'>
      <div className='characters__banner'>
        <img
          src={bannerImg}
          alt='Banner Rick and Morty'
          loading='lazy'
          className='characters__banner-image'
        />
      </div>

      <div className='characters__body'>
        <div className='characters__filters'>
          <TextInput
            placeholder='Filter by name...'
            mode='bordered'
            IconComponent={IconSearchTextInput}
          />

          <Select
            mode='medium'
            placeholder='Select species'
            value={species}
            onChange={setSpecies}
            options={SPECIES_OPTIONS}
          />
          <Select
            mode='medium'
            placeholder='Select gender'
            value={gender}
            onChange={setGender}
            options={GENDER_OPTIONS}
          />

          <Select
            mode='medium'
            placeholder='Select status'
            value={status}
            onChange={setStatus}
            options={STATUS_OPTIONS}
          />
        </div>

        <div className='characters__list'>
          {characters.map((character) => (
            <CharacterCard
              key={character.name}
              {...character}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
