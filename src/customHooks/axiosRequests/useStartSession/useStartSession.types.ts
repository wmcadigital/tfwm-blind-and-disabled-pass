import { AxiosResponse } from 'axios';
import { TSession } from 'types/session';

export type TuseStartSession = () => {
  startSession: () => Promise<AxiosResponse<TSession> | null>;
  isLoading: boolean;
  hasError: boolean;
};
