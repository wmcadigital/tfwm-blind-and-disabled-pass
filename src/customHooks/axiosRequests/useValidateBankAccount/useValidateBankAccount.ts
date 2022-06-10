import { useEffect, useState } from 'react';
import useAxiosRequest from '../_useAxiosRequest';
import { TUseValidateBankAccount } from './useValidateBankAccount.types';

const useValidateBankAccount: TUseValidateBankAccount = (sortCode, accountNumber) => {
  const { REACT_APP_DBAPI_HOST } = process.env;

  const options = {
    url: `${REACT_APP_DBAPI_HOST}/DirectDebit/ValidateBankAccount?sortCode=${sortCode}&accountNo=${accountNumber}`,
  };

  const { hasError, isLoading, sendRequest } = useAxiosRequest<boolean>(options);
  const [clearError, setClearError] = useState(false);

  const sendValidationRequest = () => {
    setClearError(false);
    return sendRequest();
  };

  useEffect(() => {
    setClearError(true);
  }, [sortCode, accountNumber]);

  return {
    hasError: clearError ? false : hasError,
    isLoading,
    sendRequest: sendValidationRequest,
  };
};

export default useValidateBankAccount;
