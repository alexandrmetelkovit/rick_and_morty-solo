import bigLoaderImg from '../../assets/images/loaders/loader-big.png';
import smallLoaderImg from '../../assets/images/loaders/loader-small.png';
import './Loader.css';

interface ILoaderProps {
  mode: 'smallLoader' | 'bigLoader';
}

export const Loader = ({ mode }: ILoaderProps) => {
  const loaders = {
    smallLoader: {
      src: smallLoaderImg,
      width: 101,
      height: 103,
      text: null
    },
    bigLoader: {
      src: bigLoaderImg,
      width: 475,
      height: 465,
      text: 'Loading character card...'
    }
  };

  const { src, width, height, text } = loaders[mode];

  return (
    <div className='loader'>
      <img
        className='loader__image'
        src={src}
        width={width}
        height={height}
        alt='Анимация загруки'
        aria-label='Анимация загрузки'
      />
      {text && <p className='loader__text'>{text}</p>}
    </div>
  );
};
