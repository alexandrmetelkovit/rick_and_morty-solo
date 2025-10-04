import { TextInput } from '@/components';
import { Select } from '@/components/Select/Select';
import bannerImg from '@/assets/images/page-content/banner.png';
import {
  SPECIES_OPTIONS,
  STATUS_OPTIONS
} from '@/shared/constants/filterOptions';
import {
  CircleStatus,
  type TStatusesType
} from '@/components/CircleStatus/CircleStatus';

import './CharacterList.scss';

export const CharactersList = () => {
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
        <TextInput
          placeholder='Filter by name...'
          mode='bordered'
        />
        <TextInput
          placeholder='Filter by name...'
          mode='underline'
        />

        <Select
          mode='default'
          placeholder='Species'
          options={SPECIES_OPTIONS}
        />

        <Select
          mode='small'
          placeholder='Alive'
          options={STATUS_OPTIONS}
          SelectOptionComponent={({ value }) => (
            <>
              {value}
              <CircleStatus status={value as TStatusesType} />
            </>
          )}
        />
        <div className='characters__list'></div>
      </div>
    </div>
  );
};
