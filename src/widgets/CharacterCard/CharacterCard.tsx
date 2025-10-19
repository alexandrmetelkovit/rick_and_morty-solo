import { useState } from 'react';

import { Link } from 'react-router-dom';

import { cn } from '@/shared/helpers';
import cardImage from '@/assets/images/rick.jpg';
import { STATUS_OPTIONS } from '@/shared/constants';
import IconCloseCharacterCard from '@/assets/icons/close.svg?react';
import IconEditCharacterCard from '@/assets/icons/edit-card.svg?react';
import IconConfirmCharacterCard from '@/assets/icons/confirm.svg?react';
import { CircleStatus, Select, TextInput } from '@/shared/components';
import type { TStatus } from '@/shared/types';

import './CharacterCard.scss';

export interface ICharacterCardProps {
  name: string;
  gender: string;
  species: string;
  location: string;
  status: TStatus;
}

export const CharacterCard = ({
  name,
  gender,
  species,
  location,
  status
}: ICharacterCardProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [currentName, setCurrentName] = useState<string>(name);
  const [currentLocation, setCurrentLocation] = useState<string>(location);
  const [statusValue, setStatusValue] = useState<TStatus>(status);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentName(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentLocation(e.target.value);
  };

  const handleOpenChangeCard = () => {
    setIsEdit(true);
  };

  const handleConfirmChangeCard = () => {
    setIsEdit(false);
  };

  const handleStatusChange = (value: TStatus) => {
    setStatusValue(value);
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
        <div className='characterCard__imageWrapper'>
          <img
            src={cardImage}
            alt={name}
            loading='lazy'
            className='characterCard__image'
          />
        </div>

        <div className='characterCard__body'>
          <div className='characterCard__header'>
            <div className='characterCard__name'>
              {isEdit ? (
                <TextInput
                  mode='underlined'
                  onChange={handleNameChange}
                  value={currentName}
                />
              ) : (
                <Link to='/character'>{currentName}</Link>
              )}
            </div>

            <div className='characterCard__actions'>
              {isEdit ? (
                <>
                  <button className='characterCard__button'>
                    <IconCloseCharacterCard
                      onClick={handleCancelChangeCard}
                      aria-label='Cancel changes'
                    />
                  </button>
                  <button className='characterCard__button'>
                    <IconConfirmCharacterCard
                      onClick={handleConfirmChangeCard}
                      aria-label='Confirm changes'
                    />
                  </button>
                </>
              ) : (
                <button className='characterCard__button'>
                  <IconEditCharacterCard
                    onClick={handleOpenChangeCard}
                    aria-label='Edit card'
                  />
                </button>
              )}
            </div>
          </div>

          <div className='characterCard__list'>
            <div className='characterCard__item'>
              <p className='characterCard__title'>Gender</p>
              <span className='characterCard__option'>{gender}</span>
            </div>

            <div className='characterCard__item'>
              <p className='characterCard__title'>Species</p>
              <span className='characterCard__option'>{species}</span>
            </div>

            <div className='characterCard__item'>
              <p className='characterCard__title'>Location</p>

              {isEdit ? (
                <span className='characterCard__option'>
                  <TextInput
                    mode='underlined'
                    value={currentLocation}
                    onChange={handleLocationChange}
                  />
                </span>
              ) : (
                <span className='characterCard__option'>{currentLocation}</span>
              )}
            </div>

            <div className='characterCard__item'>
              <p className='characterCard__title'>Status</p>

              <span className='characterCard__option'>
                {isEdit ? (
                  <Select
                    mode='small'
                    options={STATUS_OPTIONS}
                    value={statusValue}
                    onChange={handleStatusChange}
                    SelectOptionComponent={({ option }) => (
                      <>
                        {option?.value}
                        <CircleStatus status={option?.value} />
                      </>
                    )}
                  />
                ) : (
                  <>
                    {statusValue}
                    <CircleStatus status={statusValue} />
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
