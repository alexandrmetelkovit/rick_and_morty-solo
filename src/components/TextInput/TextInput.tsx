import { cn } from '@/shared/lib/helper';
import IconSearchTextInput from '@/assets/icons/search_icon.svg?react';

import './TextInput.scss';

export interface ITextInputProps {
  mode?: 'bordered' | 'underline';
  placeholder?: string;
}

export const TextInput = ({ mode, placeholder }: ITextInputProps) => {
  return (
    <div
      className={cn('textInput', {
        textInput_bordered: mode === 'bordered',
        textInput_underline: mode === 'underline'
      })}
    >
      <div className='textInput-inner'>
        {mode === 'bordered' && (
          <IconSearchTextInput className='textInput__icon' />
        )}
        <input
          type='text'
          className={cn('textInput__input', {
            textInput__input_underline: mode === 'underline'
          })}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
