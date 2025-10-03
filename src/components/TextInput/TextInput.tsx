import { cn } from '@/shared/lib/helper';
import IconSearchTextInput from '@/assets/icons/search_icon.svg?react';

import './TextInput.scss';

export interface ITextInputProps {
  mode?: 'filterInput' | 'cardInput';
  placeholder?: string;
}

export const TextInput = ({ mode, placeholder }: ITextInputProps) => {
  return (
    <div
      className={cn('textInput', {
        textInput_filterInput: mode === 'filterInput',
        textInput_cardInput: mode === 'cardInput'
      })}
    >
      <div className='textInput-inner'>
        {mode === 'filterInput' && (
          <IconSearchTextInput className='textInput__icon' />
        )}
        <input
          type='text'
          className={cn('textInput__input', {
            textInput__input_cardInput: mode === 'cardInput'
          })}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
