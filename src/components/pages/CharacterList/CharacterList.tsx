import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import bannerImg from '../../../assets/images/page-content/banner.png';
import { Loader } from '../../Loader/Loader';
import './CharacterList.css';

export const CharactersList = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('Current location is ', location);
  }, [location]);

  const MAX_WIDTH_BANNER = 600;

  const MAX_HEIGHT_BANNER = 200;

  return (
    <div className='characters container'>
      <img
        className='characters__list_image'
        src={bannerImg}
        width={MAX_WIDTH_BANNER}
        height={MAX_HEIGHT_BANNER}
        loading='lazy'
      />

      <div className='characters__body'>
        <div className='characters__list'>
          <Loader mode='bigLoader' />
          <Loader mode='smallLoader' />
        </div>
      </div>
    </div>
  );
};
