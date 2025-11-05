import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import { Loader } from '@/shared/components';
import type { ICharacterCard } from '@/shared/types';
import { CharacterCard, FilterPanel } from '@/widgets';
import { getErrorMessage } from '@/shared/api/errorUtils';
import { getCharacters } from '@/shared/api/getCharacters';
import bannerImg from '@/assets/images/page-content/banner.png';

import './CharacterList.scss';

export const CharactersList = () => {
  const [characters, setCharacters] = useState<ICharacterCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        setErrorText('');

        const data = await getCharacters();
        setCharacters(data);

        setIsLoading(false);
      } catch (error) {
        const message = getErrorMessage(error);

        toast.error(message);
        setErrorText(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className='characters container'>
      <div className='characters__banner'>
        <img
          src={bannerImg}
          alt='Banner Rick and Morty'
          loading='lazy'
          className='characters__banner-image'
        />
      </div>

      <div className='characters__body'>
        <FilterPanel />

        <ul className='characters__list'>
          {isLoading ? (
            <Loader
              size='medium'
              text='Loading characters...'
            />
          ) : errorText ? (
            <p className='characters__error'>{errorText}</p>
          ) : characters.length === 0 ? (
            <p className='characters__empty'>Список персонажей пуст</p>
          ) : (
            characters.map((character) => (
              <li key={character.id}>
                <CharacterCard {...character} />
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
