import { useFormDataContext } from 'state/formDataState/context';
import useAxiosRequest from '../_useAxiosRequest';

const useSubmitSession = () => {
  const [formDataState] = useFormDataContext();
  const { REACT_APP_DBAPI_HOST } = process.env;

  const { hasError, isLoading, sendRequest, response } = useAxiosRequest<any>({
    url: `${REACT_APP_DBAPI_HOST}/DirectDebit/SubmitSession`,
    method: 'POST',
    data: formDataState,
  });

  const submissionWasSuccessful = response?.status === 200;

  return {
    hasError,
    isLoading,
    submitFormData: sendRequest,
    submissionWasSuccessful,
  };
};

export default useSubmitSession;
