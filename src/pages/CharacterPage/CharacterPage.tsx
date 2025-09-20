import { Link } from 'react-router-dom';

import { Loader } from '@/components/Loader/Loader';
import IconArrowLeftBack from '@/assets/icons/arrow_back.svg?react';

import './CharacterPage.scss';

export const CharacterPage = () => {
  return (
    <>
      <div className='character-page container'>
        <div className='character-page__actions'>
          <Link
            to='/'
            className='character-page__link'
          >
            <IconArrowLeftBack
              className='character-page__icon'
              aria-label='Вернуться на главную'
            />
            GO BACK
          </Link>
        </div>
        <div className='character-page__body'>
          <Loader mode='bigLoader' />
          <Loader mode='smallLoader' />
        </div>
      </div>
    </>
  );
};
