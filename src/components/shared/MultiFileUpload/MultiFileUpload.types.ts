import { Nullable } from 'types/helpers';
import { TError } from 'types/validation';

export type TMultiFileUploadProps = {
  name: string;
  error: Nullable<TError>;
  label?: string;
  hint?: string;
  maxFiles: number;
  defaultFiles?: Nullable<File[]>;
  updateFiles: (files: Nullable<File[]>) => void;
  removeFile: (file: File) => void;
  accept?: string;
};
