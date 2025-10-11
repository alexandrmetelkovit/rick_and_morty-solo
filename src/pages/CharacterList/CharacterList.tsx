import { TextInput } from '@/components';
import { Select } from '@/components/Select/Select';
import bannerImg from '@/assets/images/page-content/banner.png';
import {
  GENDER_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS
} from '@/shared/constants/filterOptions';

import './CharacterList.scss';
import { CharacterCard } from '@/widgets/CharacterCard/CharacterCard';

export const CharactersList = () => {
  const rick = {
    name: 'Rick Sanchez',
    gender: 'Male',
    species: 'Human',
    location: 'Earth',
    status: 'Alive',
    value: 'Alive'
  };

  return (
    <div className='characters container'>
      <div className='characters__banner'>
        <img
          className='characters__banner-image'
          src={bannerImg}
          loading='lazy'
        />
      </div>

      <div className='characters__body'>
        <div className='characters__filters'>
          <TextInput
            placeholder='Filter by name...'
            mode='bordered'
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
            SelectOptionComponent={({ value }) => <>{value}</>}
          />
        </div>

        <div className='characters__list'>
          <CharacterCard
            name={rick.name}
            gender={rick.gender}
            species={rick.species}
            location={rick.location}
            status={rick.status}
            value={rick.value}
          />
        </div>
      </div>
    </div>
  );
};
