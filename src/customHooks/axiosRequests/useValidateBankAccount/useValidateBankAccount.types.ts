import { AxiosResponse } from 'axios';
import { Nullable } from 'types/helpers';

export type TUseValidateBankAccount = (
  sortCode: Nullable<string>,
  accountNumber: Nullable<string>,
) => {
  hasError: boolean;
  isLoading: boolean;
  sendRequest: () => Promise<AxiosResponse<boolean> | null>;
};
