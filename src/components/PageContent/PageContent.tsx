import type React from 'react';

interface IPageContenProps {
  children: React.ReactNode;
}

export const PageContent = ({ children }: IPageContenProps) => {
  return <main className='main'>{children}</main>;
};
