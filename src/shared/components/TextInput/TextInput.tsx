import { memo } from 'react';

import { cn } from '@/shared/helpers';

import './TextInput.scss';

export interface ITextInputProps {
  value?: string;
  mode?: 'bordered' | 'underlined';
  placeholder?: string;
  onChange?: (value: string) => void;
  IconComponent?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const TextInput = memo(
  ({
    value,
    mode = 'bordered',
    placeholder,
    onChange,
    IconComponent
  }: ITextInputProps) => {
    const handleChangeName = (e: { target: { value: string } }) => {
      onChange?.(e.target.value);
    };

    return (
      <div
        className={cn('textInput', {
          textInput_bordered: mode === 'bordered',
          textInput_underlined: mode === 'underlined'
        })}
      >
        <div className='textInput__wrapper'>
          {IconComponent && <IconComponent className='textInput__icon' />}
          <input
            type='text'
            className={cn('textInput__input', {
              textInput__input_underlined: mode === 'underlined'
            })}
            placeholder={placeholder}
            onChange={handleChangeName}
            value={value}
          />
        </div>
      </div>
    );
  }
);
