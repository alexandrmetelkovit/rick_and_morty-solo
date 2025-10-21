import bannerImg from '@/assets/images/page-content/banner.png';
import { FilterPanel } from '@/widgets/CharacterCard/FilterPanel/FilterPanel';
import {
  CharacterCard,
  type ICharacterCardProps
} from '@/widgets/CharacterCard/CharacterCard';

import './CharacterList.scss';

export const CharactersList = () => {
  const characters: ICharacterCardProps[] = [
    {
      name: 'Rick Sanchez',
      gender: 'male',
      species: 'human',
      location: 'earth',
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
