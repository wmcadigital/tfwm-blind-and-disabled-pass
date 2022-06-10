import { AxiosResponse } from 'axios';
import { useFormDataContext } from 'state/formDataState/context';
import { Nullable } from 'types/helpers';
import useAxiosRequest from '../_useAxiosRequest';

type TReturn = {
  sessionPhotoId: number;
  sessionNo: number;
  photo: string;
}[];

const useStoreSessionPhotos = (photos: Nullable<File>[]) => {
  const [formDataState] = useFormDataContext();
  const { sessionNo } = formDataState;

  const { REACT_APP_DBAPI_HOST } = process.env;

  const formData: FormData = new FormData();
  if (photos.length) {
    photos.forEach((photo) => {
      if (typeof photo !== 'object') return;
      formData.append(`postedPhotos`, photo!);
    });
  }

  const { hasError, isLoading, sendRequest, response } = useAxiosRequest<TReturn>({
    url: `${REACT_APP_DBAPI_HOST}/DirectDebit/StoreSessionPhotos?sessionNo=${sessionNo}`,
    method: 'POST',
    data: formData,
  });

  if (!photos.length) {
    const emptyReturn: TReturn = [
      {
        sessionPhotoId: 0,
        sessionNo,
        photo: '',
      },
    ];

    const emptyReturnArray = Array(photos.length).map(() => emptyReturn);

    return {
      hasError: false,
      isLoading: false,
      sendRequest: () => Promise.resolve({ data: emptyReturn } as AxiosResponse<TReturn> | null),
      photoInfo: emptyReturnArray,
    };
  }

  const photoInfo = response?.data;

  return {
    hasError,
    isLoading,
    sendRequest,
    photoInfo,
  };
};

export default useStoreSessionPhotos;
