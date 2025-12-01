import React from 'react';
import { memo } from 'react';

interface IPageContenProps {
  children: React.ReactNode;
}

export const PageContent = memo(({ children }: IPageContenProps) => {
  return <main className='main'>{children}</main>;
});
