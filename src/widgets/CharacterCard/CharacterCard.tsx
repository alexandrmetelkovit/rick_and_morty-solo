import { useState } from 'react';

import { Link } from 'react-router-dom';

import { cn } from '@/shared/lib/helper';
import cardImage from '@/assets/images/rick.jpg';
import { STATUS_OPTIONS } from '@/shared/constants';
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

export interface ICharacterCardProps {
  name: string;
  gender: string;
  species: string;
  location: string;
  status: string;
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
  const [statusValue, setStatusValue] = useState<string>(status);

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

  const handleStatusChange = ({ label }: { label: string }) => {
    setStatusValue(label);
  };

  const handleCancelChangeCard = () => {
    setIsEdit(false);
    setCurrentName(name);
    setCurrentLocation(location);
    setStatusValue(statusValue);
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
            alt='Rick Sanchez photo'
            loading='lazy'
            className='characterCard__image'
          />
        </div>

        <div className='characterCard__body'>
          <div className='characterCard__header'>
            <div className='characterCard__name'>
              {!isEdit ? (
                <Link to={'/character'}>{currentName}</Link>
              ) : (
                <TextInput
                  mode='underlined'
                  onChange={handleNameChange}
                  value={currentName}
                />
              )}
            </div>

            <div className='characterCard__actions'>
              {!isEdit ? (
                <>
                  <button className='characterCard__button'>
                    <IconCloseCharacterCard
                      aria-label='Close the card'
                      onClick={handleConfirmChangeCard}
                    />
                  </button>
                  <button className='characterCard__button'>
                    <IconEditCharacterCard
                      aria-label='Edit card'
                      onClick={handleOpenChangeCard}
                    />
                  </button>
                </>
              ) : (
                <>
                  <button className='characterCard__button'>
                    <IconCloseCharacterCard
                      aria-label='Cancel card changes'
                      onClick={handleCancelChangeCard}
                    />
                  </button>
                  <button className='characterCard__button'>
                    <IconConfirmCharacterCard
                      aria-label='Confirm changed'
                      onClick={handleConfirmChangeCard}
                    />
                  </button>
                </>
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
            </div>

            <div className='characterCard__item'>
              <p className='characterCard__title'>Status</p>

              <span className='characterCard__option'>
                {!isEdit ? (
                  <>
                    {statusValue}
                    <CircleStatus status={statusValue as TStatusesType} />
                  </>
                ) : (
                  <Select
                    mode='small'
                    options={STATUS_OPTIONS}
                    value={statusValue}
                    onChange={handleStatusChange}
                    SelectOptionComponent={({ value }) => {
                      return (
                        <>
                          {value}
                          <CircleStatus status={value as TStatusesType} />
                        </>
                      );
                    }}
                  />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
