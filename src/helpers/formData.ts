/* eslint-disable */ 
import { initialState } from 'state/formDataState';
import type { TFormDataStateKey } from 'state/formDataState';

const getInitialValue = (dataName: TFormDataStateKey) => {
  return initialState[dataName];
};

export { getInitialValue };
