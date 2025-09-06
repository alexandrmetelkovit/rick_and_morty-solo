import cardImage from '../../assets/images/rick.jpg';

import './CharacterCard.css';

export const CharacterCard = () => {
  return (
    <>
      <div className='character-card'>
        <div className='character-card__image'>
          <img
            src={cardImage}
            alt=''
            width={240}
            height={234}
          />
        </div>

        <div className='character-card__body'>
          <div className='character-card__header-wrapper'>
            <div className='character-card__header'>
              <p>Rick Sanchez</p>
            </div>
          </div>

          <ul className='character-card__list'>
            <li className='character-card__item'>
              <p className='character-card__title'>Gender</p>

              <span className='character-card__option'>Male</span>
            </li>

            <li className='character-card__item'>
              <p className='character-card__title'>Species</p>

              <span className='character-card__option'>Human</span>
            </li>

            <li className='character-card__item'>
              <p className='character-card__title'>Location</p>

              <span className='character-card__option'>Earth</span>
            </li>

            <li className='character-card__item'>
              <p className='character-card__title'>Status</p>

              <span className='character-card__option'>Alive</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
