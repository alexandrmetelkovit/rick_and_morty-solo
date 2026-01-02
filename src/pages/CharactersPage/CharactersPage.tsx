import { memo } from 'react';

import bannerImg from '@/assets/images/page-content/banner.png';

import { FiltersPanel } from './FiltersPanel/FiltersPanel';
import { CharactersList } from './CharactersList/CharactersList';

import './CharactersPage.scss';

export const CharactersPage = memo(() => {
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
        <FiltersPanel />
        <CharactersList />
      </div>
    </div>
  );
});
