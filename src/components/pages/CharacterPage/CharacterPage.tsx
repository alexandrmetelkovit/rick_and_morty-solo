import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import IconArrowLeftBack from '../../../assets/icons/arrow_back.svg?react';
import { Loader } from '../../Loader/Loader';
import './CharacterPage.css';

export const CharacterPage = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('Current location is ', location);
  }, [location]);

  const MAX_WIDTH_ARROW_BACK = 24;
  const MAX_HEIGTH_ARROW_BACK = 24;

  return (
    <>
      <div className='character__page container'>
        <div className='character__actions'>
          <Link
            to='/'
            className='character__link'
          >
            <IconArrowLeftBack
              width={MAX_WIDTH_ARROW_BACK}
              height={MAX_HEIGTH_ARROW_BACK}
              aria-label='Вернуться на главную'
            />
            GO BACK
          </Link>
        </div>
        <div className='character__body'>
          <Loader mode='bigLoader' />
          <Loader mode='smallLoader' />
        </div>
      </div>
    </>
  );
};
