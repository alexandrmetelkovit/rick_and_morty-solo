import imgLogo from '@/assets/images/header-logo/logo.svg';
import './Header.scss';

export const Header = () => {
  return (
    <header className='header'>
      <div className='header__wrapper container'>
        <img
          className='header__image'
          src={imgLogo}
          alt='Logo app'
          aria-label='Logo app'
        />
      </div>
    </header>
  );
};
