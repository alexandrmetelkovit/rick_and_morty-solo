import { cn } from '@/shared/lib/helper';
import IconSearchTextInput from '@/assets/icons/search_icon.svg?react';

import './TextInput.scss';

export interface ITextInputProps {
  value?: string;
  mode?: 'bordered' | 'underlined';
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = ({
  mode,
  placeholder,
  value,
  onChange
}: ITextInputProps) => {
  return (
    <div
      className={cn('textInput', {
        textInput_bordered: mode === 'bordered',
        textInput_underlined: mode === 'underlined'
      })}
    >
      <div className='textInput-inner'>
        {mode === 'bordered' && (
          <IconSearchTextInput className='textInput__icon' />
        )}
        <input
          type='text'
          className={cn('textInput__input', {
            textInput__input_underlined: mode === 'underlined'
          })}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
};
