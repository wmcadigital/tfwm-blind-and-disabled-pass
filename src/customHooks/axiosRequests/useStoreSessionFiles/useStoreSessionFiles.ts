import { AxiosResponse } from 'axios';
import { useFormDataContext } from 'state/formDataState/context';
import { Nullable } from 'types/helpers';
import useAxiosRequest from '../_useAxiosRequest';

type TReturn = {
  sessionFileId: number;
  sessionNo: number;
  guid: string;
  filename: string;
  fileBinary: string;
}[];

const useStoreSessionFiles = (files: Nullable<File>[]) => {
  const [formDataState] = useFormDataContext();
  const { sessionNo } = formDataState;

  const { REACT_APP_DBAPI_HOST } = process.env;

  const formData: FormData = new FormData();
  if (files.length) {
    files.forEach((file) => {
      if (typeof file !== 'object') return;
      formData.append(`postedFiles`, file!);
    });
  }

  const { hasError, isLoading, sendRequest, response } = useAxiosRequest<TReturn>({
    url: `${REACT_APP_DBAPI_HOST}/DirectDebit/StoreSessionFiles?sessionNo=${sessionNo}`,
    method: 'POST',
    data: formData,
  });

  if (!files.length) {
    const emptyReturn: TReturn = [
      {
        sessionFileId: 0,
        sessionNo: 0,
        guid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        filename: 'string',
        fileBinary: 'string',
      },
    ];

    const emptyReturnArray = Array(files.length).map(() => emptyReturn);

    return {
      hasError: false,
      isLoading: false,
      sendRequest: () => Promise.resolve({ data: emptyReturn } as AxiosResponse<TReturn> | null),
      fileInfo: emptyReturnArray,
    };
  }

  const fileInfo = response?.data;

  return {
    hasError,
    isLoading,
    sendRequest,
    fileInfo,
  };
};

export default useStoreSessionFiles;
