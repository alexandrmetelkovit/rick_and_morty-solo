import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

import NotFoundImage from '@/assets/images/page-content/not-found.png';

export const NotFoundPage = () => {
  return (
    <div className='notFoundPage'>
      <img
        src={NotFoundImage}
        alt='Not found page'
        className='notFoundPage__image'
      />
      <Link
        to='/'
        className='notFoundPage__back'
      >
        Go to main page
      </Link>
    </div>
  );
};
