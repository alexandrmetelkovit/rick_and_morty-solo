import { cn } from '@/shared/lib/helper';

import './TextInput.scss';

export interface ITextInputProps {
  value?: string;
  mode?: 'bordered' | 'underlined';
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  IconComponent?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const TextInput = ({
  mode = 'bordered',
  placeholder,
  value,
  onChange,
  IconComponent
}: ITextInputProps) => {
  return (
    <div
      className={cn('textInput', {
        textInput_bordered: mode === 'bordered',
        textInput_underlined: mode === 'underlined'
      })}
    >
      <div className='textInput-inner'>
        {IconComponent && <IconComponent className='textInput__icon' />}
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
