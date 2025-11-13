import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Loader } from '@/shared/components';
import type { ICharacterCard } from '@/shared/types';
import { CharacterCard, FilterPanel } from '@/widgets';
import { getCharacters, getErrorMessage } from '@/shared/api';
import bannerImg from '@/assets/images/page-content/banner.png';

import './CharacterList.scss';

export const CharactersList = () => {
  const [characters, setCharacters] = useState<ICharacterCard[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  const [filterName, setFilterName] = useState('');
  const [filterSpecies, setFilterSpecies] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setIsLoading(true);
        setErrorText('');

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const { results, hasNextPage } = await getCharacters(page, {
          name: filterName,
          species: filterSpecies,
          gender: filterGender,
          status: filterStatus
        });

        setCharacters((prev) => (page === 1 ? results : [...prev, ...results]));

        setHasMore(hasNextPage);

        await new Promise((r) => setTimeout(r, 1000));
      } catch (error) {
        const message = getErrorMessage(error);

        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [page, filterName, filterSpecies, filterGender, filterStatus]);

  useEffect(() => {
    setPage(1);
  }, [filterName, filterSpecies, filterGender, filterStatus]);

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
        <FilterPanel
          name={filterName}
          species={filterSpecies}
          gender={filterGender}
          status={filterStatus}
          onChangeName={setFilterName}
          onChangeSpecies={setFilterSpecies}
          onChangeGender={setFilterGender}
          onChangeStatus={setFilterStatus}
        />

        {characters.length === 0 && isLoading ? (
          <Loader
            size='medium'
            text='Loading characters...'
          />
        ) : errorText ? (
          <p className='characters__error'>{errorText}</p>
        ) : characters.length === 0 ? (
          <p className='characters__empty'>Список персонажей пуст</p>
        ) : (
          <InfiniteScroll
            dataLength={characters.length || 0}
            next={() => setPage((page) => page + 1)}
            hasMore={hasMore}
            loader={<Loader size='small' />}
            endMessage={
              <p style={{ textAlign: 'center', paddingTop: '20px' }}>
                End of list
              </p>
            }
            style={{ overflow: 'visible' }}
          >
            <ul className='characters__list'>
              {characters.map((character) => (
                <li key={character.id}>
                  <CharacterCard {...character} />
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
};
