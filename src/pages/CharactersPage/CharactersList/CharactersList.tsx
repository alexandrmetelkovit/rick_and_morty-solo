import { memo } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import { CharacterCard } from '@/widgets';
import { Loader } from '@/shared/components';
import { useCharacters } from '@/hooks/useCharacters';
import { useCharactersContext } from '@/shared/contexts';

import './CharactersList.scss';

export const CharactersList = memo(() => {
  const { characters, updatedCharacter } = useCharactersContext();

  const { hasMore, isLoading, setPage, errorText } = useCharacters();

  return (
    <div className='characters__list'>
      {isLoading && characters.length === 0 ? (
        <Loader
          size='medium'
          text='Loading characters...'
        />
      ) : errorText ? (
        <p className='characters__list_error'>{errorText}</p>
      ) : characters.length === 0 ? (
        <p className='characters__list_empty'>Character list is empty...</p>
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
          <ol className='characters__list_items'>
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
  );
});
