import type React from 'react';
import './PageContent.css';

interface IPageContenProps {
  children: React.ReactNode;
}

export const PageContent = ({ children }: IPageContenProps) => {
  return <main className='main'>{children}</main>;
};
