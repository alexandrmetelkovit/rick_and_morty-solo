import bannerImg from 'assets/images/page-content/banner.png';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import './CharacterList.scss';

export const CharactersList = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('Current location is ', location);
  }, [location]);

  return (
    <div className='characters container'>
      <div className='characters__banner'>
        <img
          className='characters__banner-image'
          src={bannerImg}
          width={600}
          height={200}
          loading='lazy'
        />
      </div>

      <div className='characters__body'>
        <div className='characters__list'>
          <Loader mode='bigLoader' />
          <Loader mode='smallLoader' />
        </div>
      </div>
    </div>
  );
};
