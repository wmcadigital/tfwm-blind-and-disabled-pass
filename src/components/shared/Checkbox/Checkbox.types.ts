import React from 'react';
import { Nullable } from 'types/helpers';
import { TError } from 'types/validation';

export type TCheckboxProps = {
  name: string;
  defaultValue: Nullable<boolean>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelValue?: string;
  labelElement?: JSX.Element;
  error: Nullable<TError>;
  classes: string | null;
};
