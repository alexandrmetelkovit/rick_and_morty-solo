import { memo, useState } from 'react';

import { Link } from 'react-router-dom';

import { cn } from '@/shared/helpers';
import type { TStatus } from '@/shared/types';
import { STATUS_OPTIONS } from '@/shared/constants';
import IconCloseCharacterCard from '@/assets/icons/close.svg?react';
import { CircleStatus, Select, TextInput } from '@/shared/components';
import IconEditCharacterCard from '@/assets/icons/edit-card.svg?react';
import IconConfirmCharacterCard from '@/assets/icons/confirm.svg?react';

import './CharacterCard.scss';

export type TUpdatedCharacter = {
  id: number;
  name: string;
  location: {
    name: string;
    url: string;
  };
  status: TStatus;
};

export interface ICharacterCard {
  id: number;
  name: string;
  gender: string;
  species: string;
  location: {
    name: string;
    url: string;
  };
  status: TStatus;
  image: string;
  type: string;
  origin: {
    name: string;
    url: string;
  };
  onUpdate?: (updated: TUpdatedCharacter) => void;
}

export const CharacterCard = memo(
  ({
    id,
    name,
    gender,
    species,
    location,
    status,
    image,
    onUpdate
  }: ICharacterCard) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [currentName, setCurrentName] = useState<string>(name);
    const [currentLocation, setCurrentLocation] = useState<string>(
      location.name
    );
    const [statusValue, setStatusValue] = useState<TStatus>(status);
    const [nameError, setNameError] = useState('');
    const [locationError, setLocationError] = useState('');

    const handleNameChange = (value: string) => {
      setCurrentName(value);

      if (value.trim().length < 3) {
        setNameError('Minimum 3 characters');
      } else if (value.trim().length > 25) {
        setNameError('Maximum 25 characters');
      } else {
        setNameError('');
      }
    };

    const handleLocationChange = (value: string) => {
      setCurrentLocation(value);

      if (value.trim().length < 3) {
        setLocationError('Minimum 3 characters');
      } else if (value.trim().length > 40) {
        setLocationError('Maximum 40 characters');
      } else {
        setLocationError('');
      }
    };

    const handleOpenChangeCard = () => {
      setIsEdit(true);
    };

    const handleConfirmChangeCard = () => {
      if (nameError || locationError) return;

      setIsEdit(false);

      onUpdate?.({
        id,
        name: currentName,
        location: {
          ...location,
          name: currentLocation
        },
        status: statusValue
      });
    };

    const handleStatusChange = (value: TStatus) => {
      setStatusValue(value);
    };

    const handleCancelChangeCard = () => {
      setIsEdit(false);
      setCurrentName(name);
      setCurrentLocation(location.name);
      setStatusValue(status);
      setNameError('');
      setLocationError('');
    };

    const currentStatus = STATUS_OPTIONS.find(
      (option) => option.value === statusValue
    );

    return (
      <>
        <div
          className={cn('characterCard', {
            characterCard_edit: isEdit
          })}
        >
          <div className='characterCard__imageWrapper'>
            <img
              src={image}
              alt={name}
              loading='lazy'
              className='characterCard__image'
            />
          </div>

          <div className='characterCard__body'>
            <div className='characterCard__header'>
              {isEdit ? (
                <div className='characterCard__name-inner'>
                  <TextInput
                    mode='underlined'
                    onChange={handleNameChange}
                    value={currentName}
                  />
                  <span className='characterCard__name-error'>{nameError}</span>
                </div>
              ) : (
                <div className='characterCard__name'>
                  <Link to={`/character/${id}`}>{currentName}</Link>
                </div>
              )}

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
                  <div className='characterCard__location-inner'>
                    <TextInput
                      mode='underlined'
                      value={currentLocation}
                      onChange={handleLocationChange}
                    />
                    <span className='characterCard__location-error'>
                      {locationError}
                    </span>
                  </div>
                ) : (
                  <span className='characterCard__option'>
                    <span className='characterCard__optionText'>
                      {currentLocation}
                    </span>
                  </span>
                )}
              </div>

              <div className='characterCard__item'>
                <p className='characterCard__title'>Status</p>

                {isEdit ? (
                  <Select
                    mode='small'
                    options={STATUS_OPTIONS}
                    value={statusValue}
                    onChange={handleStatusChange}
                    SelectOptionComponent={({ option }) => (
                      <>
                        {option?.label}
                        <CircleStatus status={option?.value} />
                      </>
                    )}
                  />
                ) : (
                  <span className='characterCard__option'>
                    {currentStatus?.label}
                    <CircleStatus status={statusValue} />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);
