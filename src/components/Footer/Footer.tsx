import './Footer.css';

interface IFooterProps {
  text: string;
}

export const Footer = ({ text }: IFooterProps) => {
  return (
    <footer className='footer'>
      <p className='footer__text'>{text}</p>
    </footer>
  );
};
