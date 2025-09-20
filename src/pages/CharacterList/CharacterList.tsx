import { Loader } from '@/components/Loader/Loader';
import bannerImg from '@/assets/images/page-content/banner.png';
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
        <div className='characters__list'>
          <Loader mode='bigLoader' />
          <Loader mode='smallLoader' />
        </div>
      </div>
    </div>
  );
};
