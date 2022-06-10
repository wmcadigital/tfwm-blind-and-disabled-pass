import { useEffect, useState } from 'react';
import { Nullable } from 'types/helpers';
import useAxiosRequest from '../_useAxiosRequest';

const useValidateSwiftCardNumber = (swiftCardNumber: Nullable<string>) => {
  const { REACT_APP_DBAPI_HOST } = process.env;

  const options = {
    url: `${REACT_APP_DBAPI_HOST}/DirectDebit/ValidateSwiftcard?cardNo=${swiftCardNumber}`,
  };

  const { hasError, isLoading, sendRequest } = useAxiosRequest<boolean>(options);
  const [clearError, setClearError] = useState(false);

  const sendValidationRequest = () => {
    setClearError(false);
    return sendRequest();
  };

  useEffect(() => {
    setClearError(true);
  }, [swiftCardNumber]);

  return {
    hasError: clearError ? false : hasError,
    isLoading,
    sendRequest: sendValidationRequest,
  };
};

export default useValidateSwiftCardNumber;
