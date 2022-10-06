import { TApiAddress } from 'types/address';
import useAxiosRequest from '../_useAxiosRequest';

const useGetAddress = (searchString: string) => {
  const { isLoading, hasError, response, sendRequest } = useAxiosRequest<TApiAddress[]>({
    url: `https://api.wmnetwork.co.uk/address/v1/AddressByPostcode/${encodeURI(searchString)}`,
  });

  return {
    isLoading,
    hasError,
    response,
    sendRequest,
  };
};

export default useGetAddress;
