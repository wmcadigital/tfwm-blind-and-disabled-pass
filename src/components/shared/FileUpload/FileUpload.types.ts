import { Nullable } from 'types/helpers';
import { TError } from 'types/validation';

export type TFileUploadProps = {
  name: string;
  error: Nullable<TError>;
  label?: string;
  hint?: string;
  defaultFile?: Nullable<File>;
  updateFile: (file: Nullable<File>) => void;
  accept?: string;
};
