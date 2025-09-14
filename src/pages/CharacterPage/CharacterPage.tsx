import IconArrowLeftBack from 'assets/icons/arrow_back.svg?react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import './CharacterPage.scss';

export const CharacterPage = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('Current location is ', location);
  }, [location]);

  return (
    <>
      <div className='character-page container'>
        <div className='character-page__actions'>
          <Link
            to='/'
            className='character__link'
          >
            <IconArrowLeftBack
              className='character__icon'
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
