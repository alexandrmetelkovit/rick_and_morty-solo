import { memo } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import { CharacterCard } from '@/widgets';
import { Loader } from '@/shared/components';
import { useCharacters } from '@/hooks/useCharacters';
import { useCharactersContext } from '@/shared/contexts';

import './CharactersList.scss';

export interface EndListMessageProps {
  hasMore: boolean;
  characterCount: number;
}

export const EndListMessage = ({
  hasMore,
  characterCount
}: EndListMessageProps) => {
  if (!hasMore && characterCount > 1) {
    return <p className='characters__list-end'>End of list</p>;
  }

  return null;
};

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
        <p className='characters__list-error'>{errorText}</p>
      ) : characters.length === 0 ? (
        <p className='characters__list-empty'>Character list is empty...</p>
      ) : (
        <InfiniteScroll
          dataLength={characters.length || 0}
          next={() => setPage((page) => page + 1)}
          hasMore={hasMore}
          loader={<Loader size='small' />}
          endMessage={
            <EndListMessage
              hasMore={hasMore}
              characterCount={characters.length}
            />
          }
          style={{ overflow: 'visible' }}
        >
          <ol className='characters__list-items'>
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
