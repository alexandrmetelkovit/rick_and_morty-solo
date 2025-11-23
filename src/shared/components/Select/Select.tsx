import { memo, useEffect, useRef, useState } from 'react';

import { cn } from '@/shared/helpers';
import IconArrowDownFilter from '@/assets/icons/arrow_filter-down.svg?react';

import './Select.scss';

export interface IPropsOptions<T> {
  value: T;
  label: string;
}

export interface ISelectOptionContentProps<T> {
  option?: IPropsOptions<T>;
}

export const DefaultSelectOptionContent = memo(
  <T,>({ option }: ISelectOptionContentProps<T>) => {
    return <>{option?.label}</>;
  }
);

type TModeSelect = 'medium' | 'small';

interface ISelectProps<T> {
  value: T;
  options: IPropsOptions<T>[];
  mode: TModeSelect;
  placeholder?: string;
  onChange?: (value: T) => void;
  SelectOptionComponent?: React.FC<ISelectOptionContentProps<T>>;
}

export const Select = <T extends string>({
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
      ref={componentRef}
      className={cn('select', {
        select_small: mode === 'small'
      })}
    >
      <button
        type='button'
        className={cn('select__button', {
          select__button_small: mode === 'small'
        })}
        onClick={handleShowFilterOptions}
      >
        {currentOption ? (
          <SelectOptionComponent option={currentOption} />
        ) : (
          placeholder
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
              <SelectOptionComponent option={option} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};
