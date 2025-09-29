import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import IconArrowDownFilter from '@/assets/icons/arrow_filter-down.svg?react';

import './Select.scss';

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
  const componentRef = useRef<HTMLDivElement>(null);

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
    onChange?.(option.value);
  };

  return (
    <div
      className={classNames('select', {
        select_small: mode === 'small'
      })}
      ref={componentRef}
    >
      <button
        type='button'
        className='select__button'
        onClick={handleShowFilterOptions}
      >
        <SelectOptionComponent
          value={
            mode === 'small' ? selectedOption?.label || value : placeholder
          }
        />

        <IconArrowDownFilter
          className={classNames('select__icon', {
            select__icon_active: isOpenList
          })}
        />
      </button>

      {isOpenList && options.length && (
        <ol className='select__list'>
          {options.map((option) => (
            <li
              key={option.value}
              className='select__item'
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
