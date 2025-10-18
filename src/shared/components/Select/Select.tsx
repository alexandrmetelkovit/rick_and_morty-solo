import { useEffect, useRef, useState } from 'react';

import { cn } from '@/shared/helpers';
import IconArrowDownFilter from '@/assets/icons/arrow_filter-down.svg?react';

import './Select.scss';

export interface IPropsOptions<T> {
  value: T;
  label: string;
}

export interface ISelectOptionContentProps<T> {
  value?: T;
}

export const DefaultSelectOptionContent = ({
  value
}: ISelectOptionContentProps<T>) => {
  return <>{String(value)}</>;
};

interface ISelectProps<T> {
  options: IPropsOptions<T>[];
  mode: 'medium' | 'small';
  value: T;
  placeholder?: string;
  onChange?: (value: T) => void;
  SelectOptionComponent?: React.FC<ISelectOptionContentProps<T>>;
}

export const Select = <T,>({
  options,
  mode = 'medium',
  value,
  placeholder,
  onChange,
  SelectOptionComponent = DefaultSelectOptionContent
}: ISelectProps<T>) => {
  const [isOpenList, setIsOpenList] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<IPropsOptions<T> | null>(
    null
  );
  const componentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target as Node)
      ) {
        setIsOpenList(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleShowFilterOptions = () => {
    setIsOpenList(!isOpenList);
  };

  const handleOptionClickSave = (option: IPropsOptions<T>) => {
    setSelectedOption(option);
    setIsOpenList(false);
    onChange?.(option.value);
  };

  const currentOption =
    selectedOption || options.find((o) => o.value === value) || null;

  return (
    <div
      className={cn('select', {
        select_small: mode === 'small'
      })}
      ref={componentRef}
    >
      <button
        type='button'
        className={cn('select__button', {
          select__button_small: mode === 'small'
        })}
        onClick={handleShowFilterOptions}
      >
        {mode === 'small' ? (
          <SelectOptionComponent value={currentOption?.value} />
        ) : (
          selectedOption?.label || placeholder
        )}
        <IconArrowDownFilter
          className={cn('select__icon', {
            select__icon_small: mode == 'small',
            select__icon_active: isOpenList
          })}
          aria-label='Toggle select'
        />
      </button>
      {isOpenList && options.length > 0 && (
        <ol
          className={cn('select__list', {
            select__list_small: mode === 'small'
          })}
        >
          {options.map((option) => (
            <li
              key={String(option.value)}
              className={cn('select__item', {
                select__item_small: mode === 'small'
              })}
              onClick={() => {
                handleOptionClickSave(option);
              }}
            >
              <SelectOptionComponent value={option.value} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};
