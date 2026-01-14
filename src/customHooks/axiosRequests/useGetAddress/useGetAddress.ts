import { TApiAddress } from 'types/address';
import useAxiosRequest from '../_useAxiosRequest';

const useGetAddress = (searchString: string) => {
  const { isLoading, hasError, response, sendRequest } = useAxiosRequest<TApiAddress[]>({
    url: `https://api.wmnetwork.co.uk/address/v1/AddressByPostcode/${encodeURI(searchString)}`,
    headers: {
      'power-automate': '89e0d85d-f48c-40cc-8eca-0463dc1a244a',
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
