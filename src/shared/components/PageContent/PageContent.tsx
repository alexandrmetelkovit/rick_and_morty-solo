import { memo } from 'react';
import type React from 'react';

interface IPageContenProps {
  children: React.ReactNode;
}

export const PageContent = memo(({ children }: IPageContenProps) => {
  return <main className='main'>{children}</main>;
});
