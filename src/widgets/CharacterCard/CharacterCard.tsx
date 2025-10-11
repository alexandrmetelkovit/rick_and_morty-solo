import { useState } from 'react';

import { Link } from 'react-router-dom';

import cardImage from '@/assets/images/rick.jpg';
import IconCloseCharacterCard from '@/assets/icons/close.svg?react';
import IconEditCharacterCard from '@/assets/icons/edit-card.svg?react';
import IconConfirmCharacterCard from '@/assets/icons/confirm.svg?react';
import {
  CircleStatus,
  Select,
  TextInput,
  type TStatusesType
} from '@/components';

import './CharacterCard.scss';
import { STATUS_OPTIONS } from '@/shared/constants';
import { cn } from '@/shared/lib/helper';

export interface ICharacterCardProps {
  name: string;
  gender: string;
  species: string;
  location: string;
  status: string;
  value: string;
}

export const CharacterCard = ({
  name,
  gender,
  species,
  location,
  status
}: ICharacterCardProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [currentName, setCurrentName] = useState(name);
  const [currentLocation, setCurrentLocation] = useState(location);
  const [statusValue, setStatusValue] = useState(status);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentName(e.target.value);
  };
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLocation(e.target.value);
  };
  const handleStatusChange = (option: string) => {
    setStatusValue(option);
  };

  const handleOpenChangeCard = () => {
    setIsEdit(true);
  };
  const handleConfirmChangeCard = () => {
    setIsEdit(false);
  };
  const handleCloseChangeCard = () => {
    setIsEdit(false);
  };
  const handleCancelChangeCard = () => {
    setIsEdit(false);
    setCurrentName(name);
    setCurrentLocation(location);
    setStatusValue(status);
  };

  return (
    <>
      <div
        className={cn('characterCard', {
          characterCard_edit: isEdit
        })}
      >
        <div className='characterCard__image'>
          <img
            src={cardImage}
            alt='Картинка Рик Санчез'
          />
        </div>

        <div className='characterCard__body'>
          <div className='characterCard__header'>
            {!isEdit ? (
              <div className='characterCard__name'>
                <Link to={'/character'}>{currentName}</Link>
              </div>
            ) : (
              <div className='characterCard__name'>
                <TextInput
                  mode='underlined'
                  onChange={handleNameChange}
                  value={currentName}
                />
              </div>
            )}

            <div className='characterCard__actions'>
              {!isEdit ? (
                <>
                  <button className='characterCard__button-cancel'>
                    <IconCloseCharacterCard
                      aria-label='Сбросить изменения'
                      onClick={handleCancelChangeCard}
                    />
                  </button>
                  <button className='characterCard__button-edit'>
                    <IconEditCharacterCard
                      aria-label='Редактировать карточку'
                      onClick={handleOpenChangeCard}
                    />
                  </button>
                </>
              ) : (
                <>
                  <button className='characterCard__button-close'>
                    <IconCloseCharacterCard
                      aria-label='Закрыть редактирование'
                      onClick={handleCloseChangeCard}
                    />
                  </button>
                  <button className='characterCard__button-confirm'>
                    <IconConfirmCharacterCard
                      aria-label='Подтвердить изменения'
                      onClick={handleConfirmChangeCard}
                    />
                  </button>
                </>
              )}
            </div>
          </div>

          <ol className='characterCard__list'>
            <li className='characterCard__item'>
              <p className='characterCard__title'>Gender</p>
              <span className='characterCard__option'>{gender}</span>
            </li>

            <li className='characterCard__item'>
              <p className='characterCard__title'>Species</p>
              <span className='characterCard__option'>{species}</span>
            </li>

            <li className='characterCard__item'>
              <p className='characterCard__title'>Location</p>

              {!isEdit ? (
                <span className='characterCard__option'>{currentLocation}</span>
              ) : (
                <span className='characterCard__option'>
                  <TextInput
                    mode='underlined'
                    value={currentLocation}
                    onChange={handleLocationChange}
                  />
                </span>
              )}
            </li>

            <li className='characterCard__item'>
              <p className='characterCard__title'>Status</p>

              <span className='characterCard__option'>
                {!isEdit ? (
                  <>
                    {statusValue}
                    <CircleStatus status={statusValue as TStatusesType} />
                  </>
                ) : (
                  <Select
                    mode={'small'}
                    options={STATUS_OPTIONS}
                    value={statusValue}
                    onChange={handleStatusChange}
                    SelectOptionComponent={({ value }) => (
                      <>
                        {value}
                        <CircleStatus status={value as TStatusesType} />
                      </>
                    )}
                  />
                )}
              </span>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};
