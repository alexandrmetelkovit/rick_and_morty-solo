import { cn } from '@/shared/helpers';
import smallLoaderImg from '@/assets/images/loaders/loader-small.png';
import mediumLoaderImg from '@/assets/images/loaders/loader-medium.png';

import './Loader.scss';

type TLoaderSize = 'small' | 'medium';

interface ILoaderProps {
  size: TLoaderSize;
  text?: string;
}

export const Loader = ({ size, text }: ILoaderProps) => {
  const images = {
    small: smallLoaderImg,
    medium: mediumLoaderImg
  };
  const imageSrc = images[size];

  return (
    <div
      className='loader'
      role='status'
      aria-label='loading...'
    >
      <img
        className={cn('loader__image', `loader__image_${size}`)}
        src={imageSrc}
        alt='Loading...'
        loading='lazy'
      />
      {!!text && <p className='loader__text'>{text}</p>}
    </div>
  );
};
