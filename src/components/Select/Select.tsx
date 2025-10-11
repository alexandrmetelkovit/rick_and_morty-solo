import { useEffect, useRef, useState } from 'react';

import IconArrowDownFilter from '@/assets/icons/arrow_filter-down.svg?react';

import './Select.scss';
import { cn } from '@/shared/lib/helper';

export interface IPropsOptions {
  label: string;
  value: string;
}

export interface SelectOptionContentProps {
  value?: string;
}

export const DefaultSelectOptionContent = ({
  value
}: SelectOptionContentProps) => {
  return <>{value}</>;
};

interface ISelectProps {
  options: IPropsOptions[];
  mode: 'default' | 'small';
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  SelectOptionComponent?: React.FC<SelectOptionContentProps>;
}

export const Select = ({
  options,
  mode = 'default',
  value = 'Alive',
  placeholder,
  onChange,
  SelectOptionComponent = DefaultSelectOptionContent
}: ISelectProps) => {
  const [isOpenList, setIsOpenList] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<IPropsOptions | null>(
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

  const handleOptionClickSave = (option: IPropsOptions) => {
    setSelectedOption(option);
    setIsOpenList(false);
    onChange?.(option.label);
  };

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
          <SelectOptionComponent
            value={
              mode === 'small' ? selectedOption?.label || value : placeholder
            }
          />
        ) : (
          selectedOption?.label || placeholder
        )}

        <IconArrowDownFilter
          className={cn('select__icon', {
            select__icon_small: mode == 'small',
            select__icon_active: isOpenList
          })}
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
              key={option.value}
              className={cn('select__item', {
                select__item_small: mode === 'small'
              })}
              onClick={() => {
                handleOptionClickSave(option);
              }}
            >
              <SelectOptionComponent value={option.label} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};
