import { memo } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import { Loader } from '@/shared/components';
import { useCharacters } from '@/hooks/useCharacters';
import { CharacterCard, FilterPanel } from '@/widgets';
import bannerImg from '@/assets/images/page-content/banner.png';

import './CharacterList.scss';

export const CharactersList = memo(() => {
  const {
    characters,
    hasMore,
    isLoading,
    errorText,
    setPage,
    updatedCharacter
  } = useCharacters();

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

        {isLoading && characters.length === 0 ? (
          <Loader
            size='medium'
            text='Loading characters...'
          />
        ) : errorText ? (
          <p className='characters__error'>{errorText}</p>
        ) : characters.length === 0 ? (
          <p className='characters__empty'>Character list is empty...</p>
        ) : (
          <InfiniteScroll
            dataLength={characters.length || 0}
            next={() => setPage((page) => page + 1)}
            hasMore={hasMore}
            loader={<Loader size='small' />}
            endMessage={
              !hasMore &&
              characters.length > 1 && (
                <p style={{ textAlign: 'center', paddingTop: '20px' }}>
                  End of list
                </p>
              )
            }
            style={{ overflow: 'visible' }}
          >
            <ol className='characters__list'>
              {characters.map((character) => (
                <li key={character.id}>
                  <CharacterCard
                    {...character}
                    onUpdate={updatedCharacter}
                  />
                </li>
              ))}
            </ol>
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
});
