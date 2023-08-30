import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type TUseAxiosRequest = <T>(axiosConfig: AxiosRequestConfig) => {
  isLoading: boolean;
  hasError: boolean;
  response: AxiosResponse<T> | null;
  sendRequest: () => Promise<AxiosResponse<T> | null>;
};
