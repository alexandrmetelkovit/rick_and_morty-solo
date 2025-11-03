import { useEffect, useState } from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';

import { Loader } from '@/shared/components';
import { getErrorMessage } from '@/api/errorUtils';
import bannerImg from '@/assets/images/page-content/banner.png';
import { CharacterCard, FilterPanel, type ICharacterCard } from '@/widgets';

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

        const response = await axios.get(
          'https://rickandmortyapi.com/api/character'
        );
        setCharacters(
          response.data.results.map((char: ICharacterCard) => ({
            ...char,
            status: char.status.toLowerCase()
          }))
        );
        console.log(response.data.results);

        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        const message = getErrorMessage(error);

        console.log(error);
        setTimeout(() => {
          toast.error(message);
          setErrorText(message);
        }, 1500);
        getErrorMessage(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
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

        <div className='characters__list'>
          {isLoading ? (
            <Loader
              size={'medium'}
              text='Loading characters...'
            />
          ) : errorText ? (
            <p className='characters__error'>{errorText}</p>
          ) : (
            characters.map((character) => (
              <CharacterCard
                key={character.id}
                {...character}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
