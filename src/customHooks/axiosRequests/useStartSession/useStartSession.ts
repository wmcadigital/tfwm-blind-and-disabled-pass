import { TSession } from 'types/session';
import { AxiosResponse } from 'axios';
import { useFormDataContext } from 'state/formDataState/context';
import useAxiosRequest from '../_useAxiosRequest';
import { TuseStartSession } from './useStartSession.types';

const useStartSession: TuseStartSession = () => {
  const { REACT_APP_DBAPI_HOST } = process.env;

  const [formDataState] = useFormDataContext();
  const { createdDateTime, id, sessionNo } = formDataState;

  const session: TSession = {
    createdDateTime,
    id,
    sessionNo,
  };

  const startSessionRequest = useAxiosRequest<TSession>({
    url: `${REACT_APP_DBAPI_HOST}/DirectDebit/StartSession`,
    method: 'POST',
  });

  const antiForgeryRequest = useAxiosRequest<TSession>({
    url: `${REACT_APP_DBAPI_HOST}/DirectDebit/GenerateAntiForgeryToken`,
    method: 'POST',
  });

  const sendRequest = async () => {
    const values = await Promise.all([
      startSessionRequest.sendRequest(),
      antiForgeryRequest.sendRequest(),
    ]);
    return values[0];
  };

  if (session.sessionNo && session.id) {
    return {
      startSession: () => {
        // eslint-disable-next-line prettier/prettier
        return (Promise.resolve({ data: { session } }) as unknown) as Promise<AxiosResponse<TSession>>;
      },
      isLoading: false,
      hasError: false,
    };
  }

  const isLoading = startSessionRequest.isLoading || antiForgeryRequest.isLoading;
  const hasError = startSessionRequest.hasError || antiForgeryRequest.hasError;

  return {
    startSession: sendRequest,
    isLoading,
    hasError,
  };
};

export default useStartSession;
