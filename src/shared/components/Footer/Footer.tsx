import { memo } from 'react';
import './Footer.scss';

interface IFooterProps {
  text: string;
}

export const Footer = memo(({ text }: IFooterProps) => {
  return (
    <footer className='footer'>
      <p className='footer__text'>{text}</p>
    </footer>
  );
});
