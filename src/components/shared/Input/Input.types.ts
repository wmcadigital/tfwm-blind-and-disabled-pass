import { Nullable } from 'types/helpers';
import { TError } from 'types/validation';

export type TInputProps = {
  autocomplete?: string;
  className?: string;
  groupClassName?: string;
  fieldValidation?: () => void;
  inputmode?: 'text' | 'none' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal';
  label: string | JSX.Element;
  name: string;
  defaultValue?: string | null;
  spellcheck?: boolean;
  type?: 'text' | 'number';
  error?: Nullable<TError>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  maxLength?: number;
  pattern?: string;
};
