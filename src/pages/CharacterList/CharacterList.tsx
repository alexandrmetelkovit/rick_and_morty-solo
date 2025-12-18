import { memo } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import { Loader } from '@/shared/components';
import bannerImg from '@/assets/images/page-content/banner.png';
import { CharacterCard, FilterPanel } from '@/widgets';

import './CharacterList.scss';
import { useCharacters } from '@/hooks/useCharacters';

export const CharactersList = memo(() => {
  const {
    characters,
    hasMore,
    errorText,
    isLoading,
    isPending,

    uiFilters,
    onChangeFilters,

    setPage,
    updatedCharacter
  } = useCharacters();

  const showFilterLoader = isPending && characters.length === 0;

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
          filters={uiFilters}
          onChangeFilters={onChangeFilters}
        />

        {isLoading ? (
          characters.length === 0 ? (
            <Loader
              size='medium'
              text='Loading characters...'
            />
          ) : (
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <Loader
                size='medium'
                text='Loading more...'
              />
            </div>
          )
        ) : showFilterLoader ? (
          <Loader
            size='medium'
            text='Applying filters...'
          />
        ) : errorText ? (
          <p className='characters__error'>{errorText}</p>
        ) : characters.length === 0 ? (
          <p className='characters__empty'>Character list is empty...</p>
        ) : (
          <>
            {isPending && characters.length > 0 && (
              <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <Loader
                  size='medium'
                  text='Updating list...'
                />
              </div>
            )}

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
          </>
        )}
      </div>
    </div>
  );
});
