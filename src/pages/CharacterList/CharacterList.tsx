import bannerImg from '@/assets/images/page-content/banner.png';
import {
  CharacterCard,
  FilterPanel,
  type ICharacterCardProps
} from '@/widgets';

import './CharacterList.scss';

export const CharactersList = () => {
  const characters: ICharacterCardProps[] = [
    {
      name: 'Rick Sanchez',
      gender: 'Male',
      species: 'Human',
      location: 'Earth',
      status: 'alive'
    }
  ];

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
          {characters.map((character) => (
            <CharacterCard
              key={character.name}
              {...character}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
