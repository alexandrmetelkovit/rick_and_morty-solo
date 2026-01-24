import { memo } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import { CharacterCard } from '@/widgets';
import { Loader } from '@/shared/components';
import { useCharacters } from '@/hooks/useCharacters';

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
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useCharacters();

  const characters = data?.pages.flatMap((page) => page.results) ?? [];

  if (isLoading && characters.length === 0) {
    return (
      <Loader
        size='medium'
        text='Loading characters...'
      />
    );
  }

  if (isError) {
    return <p className='characters__list-error'>{(error as Error).message}</p>;
  }

  if (characters.length === 0) {
    return <p className='characters__list-empty'>Character list is empty...</p>;
  }

  return (
    <div className='characters__list'>
      <InfiniteScroll
        dataLength={characters.length || 0}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Loader size='small' />}
        endMessage={
          <EndListMessage
            hasMore={!!hasNextPage}
            characterCount={characters.length}
          />
        }
        style={{ overflow: 'visible' }}
      >
        <ol className='characters__list-items'>
          {characters.map((character) => (
            <li key={character.id}>
              <CharacterCard {...character} />
            </li>
          ))}
        </ol>
      </InfiniteScroll>
    </div>
  );
});
