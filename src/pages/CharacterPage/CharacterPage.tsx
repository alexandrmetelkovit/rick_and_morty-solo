import { Link } from 'react-router-dom';

import { Loader } from '@/shared/components/Loader/Loader';
import IconArrowLeftBack from '@/assets/icons/arrow_back.svg?react';

import './CharacterPage.scss';

export const CharacterPage = () => {
  return (
    <>
      <div className='characterPage container'>
        <div className='characterPage__actions'>
          <Link
            to='/'
            className='characterPage__link'
          >
            <IconArrowLeftBack
              className='characterPage__icon'
              aria-label='Вернуться на главную'
            />
            GO BACK
          </Link>
        </div>
        <div className='characterPage__body'>
          <Loader
            size='medium'
            text='Loading characters...'
          />
          <Loader size='small' />
        </div>
      </div>
    </>
  );
};
