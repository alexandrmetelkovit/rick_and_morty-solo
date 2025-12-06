import { Link, Navigate, useParams } from 'react-router-dom';

import { useCharacter } from '@/hooks/useCharacter';
import { Loader } from '@/shared/components/Loader/Loader';
import IconArrowLeftBack from '@/assets/icons/arrow_back.svg?react';

import './CharacterPage.scss';

export const CharacterPage = () => {
  const { id } = useParams<{ id: string }>();
  const { character, isLoading, isError } = useCharacter(id);

  if (isLoading) {
    return (
      <div className='characterPage container'>
        <Loader
          size='medium'
          text='Loading character...'
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='characterPage container'>
        <Navigate
          to='/404'
          replace
        />
      </div>
    );
  }

  if (!character) {
    return (
      <div className='characterPage container'>
        <p>Character not found</p>
      </div>
    );
  }

  return (
    <>
      <div className='characterPage container'>
        <div className='characterPage__actions'>
          <Link
            to='/'
            className='characterPage__link'
          >
            <IconArrowLeftBack
              className='characterPage__icon'
              aria-label='Вернуться на главную'
            />
            GO BACK
          </Link>
        </div>
        <div className='characterPage__body'>
          <div className='characterPage__header'>
            <img
              className='characterPage__image'
              src={character.image}
              alt={character.name}
            />
            <h1 className='characterPage__name'>{character.name}</h1>
          </div>
          <div className='characterPage__info'>
            <h2 className='characterPage__info-title'>Information</h2>

            <ol className='characterPage__list'>
              <li className='characterPage__item'>
                <p className='characterPage__title'>Gender</p>
                <p className='characterPage__view'>{character.gender}</p>
              </li>
              <li className='characterPage__item'>
                <p className='characterPage__title'>Status</p>
                <p className='characterPage__view'>{character.status}</p>
              </li>
              <li className='characterPage__item'>
                <p className='characterPage__title'>Species</p>
                <p className='characterPage__view'>{character.species}</p>
              </li>
              <li className='characterPage__item'>
                <p className='characterPage__title'>Origin</p>
                <p className='characterPage__view'>{character.origin?.name}</p>
              </li>
              <li className='characterPage__item'>
                <p className='characterPage__title'>Type</p>
                <p className='characterPage__view'>
                  {character.type || 'Unknown'}
                </p>
              </li>
              <li className='characterPage__item'>
                <p className='characterPage__title'>Location</p>
                <p className='characterPage__view'>
                  {character.location?.name}
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};
