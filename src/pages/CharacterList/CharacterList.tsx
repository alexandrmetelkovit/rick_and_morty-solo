import { TextInput } from '@/components';
import { Select } from '@/components/Select/Select';
import bannerImg from '@/assets/images/page-content/banner.png';
import IconSearchTextInput from '@/assets/icons/search_icon.svg?react';

import {
  GENDER_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS
} from '@/shared/constants/filterOptions';

import './CharacterList.scss';
import { CharacterCard } from '@/widgets/CharacterCard/CharacterCard';

export const CharactersList = () => {
  const characters = [
    {
      name: 'Rick Sanchez',
      gender: 'Male',
      species: 'Human',
      location: 'Earth',
      status: 'Alive',
      value: 'alive'
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
            mode='default'
            placeholder='Species'
            options={SPECIES_OPTIONS}
          />
          <Select
            mode='default'
            placeholder='Gender'
            options={GENDER_OPTIONS}
          />

          <Select
            mode='default'
            placeholder='Status'
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
