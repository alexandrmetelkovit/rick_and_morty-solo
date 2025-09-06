import imgLogo from '../../assets/images/header-logo/logo.svg';
import './Header.css';

export const Header = () => {
  const WIDTH_LOGO = 46;
  const HEIGHT_LOGO = 49;

  return (
    <header className='header '>
      <div className='header__wrapper container'>
        <img
          src={imgLogo}
          alt='Логотип приложения'
          title='Логотип приложения'
          width={WIDTH_LOGO}
          height={HEIGHT_LOGO}
          loading='lazy'
        />
      </div>
    </header>
  );
};
