import { Select } from '@/components/Select/Select';
import bannerImg from '@/assets/images/page-content/banner.png';
import { SPECIES_OPTIONS, STATUS_OPTIONS } from '@/constants/filterOptions';
import {
  CircleStatus,
  type TStatusesType
} from '@/components/CircleStatus/CircleStatus';

import './CharacterList.scss';

export const CharactersList = () => {
  const placeholderSpecies = 'Species';

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
        <Select
          mode='default'
          placeholder={placeholderSpecies}
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
