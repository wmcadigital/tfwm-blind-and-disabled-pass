import { TApiAddress } from 'types/address';
import useAxiosRequest from '../_useAxiosRequest';

const useGetAddress = (searchString: string) => {
  const { isLoading, hasError, response, sendRequest } = useAxiosRequest<TApiAddress[]>({
    url: `${process.env.REACT_APP_ADDRESS_API_ENDPOINT}/${encodeURI(searchString)}`,
    headers: {
      'power-automate': process.env.REACT_APP_EMAIL_API_ENDPOINT_HEADER,
    },
  });

  return {
    isLoading,
    hasError,
    response,
    sendRequest,
  };
};

export default useGetAddress;
