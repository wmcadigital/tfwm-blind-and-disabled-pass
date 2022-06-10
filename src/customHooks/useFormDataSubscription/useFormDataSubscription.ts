import { useCallback, useState } from 'react';
import { useFormDataContext } from 'state/formDataState/context';

import { validate } from 'helpers/validation';
import { Nullable } from 'types/helpers';
import { TSubscriptionReturn } from 'types/subscription';
import { TError } from 'types/validation';

import { useGlobalContext } from 'state/globalState/context';
import { TSingleFormDataStateValue } from 'state/formDataState/types';
import { isNotNull } from 'helpers/misc';
import { TUseFormDataSubscription } from './useFormDataSubscription.types';

const useFormDataSubscription: TUseFormDataSubscription = (dataName, validationConfig = []) => {
  // Check whether this data exists in the formData
  const [formDataState, formDataDispatch] = useFormDataContext();
  if (!Object.prototype.hasOwnProperty.call(formDataState, dataName))
    throw new Error(`The property "${dataName}" is not in formData`);

  const [globalState, globalStateDispatch] = useGlobalContext();
  const { isEditing, edit } = globalState.form;

  // Set the current value of for the component to the saved valued
  const savedValue =
    isEditing && edit.temporaryData?.[dataName] !== undefined
      ? (edit.temporaryData?.[dataName] as TSingleFormDataStateValue<typeof dataName>)
      : formDataState[dataName];
  type TSavedValue = typeof savedValue;

  const initialState: Nullable<TSavedValue> =
    typeof savedValue !== null && savedValue !== '.' ? savedValue : null;
  const [currentValue, setCurrentValue] = useState(initialState);
  const [error, setError] = useState<Nullable<TError>>(null);

  const validateData = useCallback(() => {
    const validation = validate(currentValue, validationConfig);
    if (!validation.isValid) {
      setError(validation.error);
      return false;
    }

    setError(null);
    return true;
  }, [currentValue, validationConfig]);

  const save = useCallback(() => {
    const isValid = validateData();
    if (isValid) {
      if (isEditing) {
        globalStateDispatch({
          type: 'UPDATE_TEMP_FORM_DATA',
          payload: {
            name: dataName,
            value: currentValue!,
          },
        });
      } else {
        formDataDispatch({
          type: 'UPDATE_FORM_DATA',
          payload: {
            [dataName]: currentValue!,
          },
        });
      }
    }
    return isValid;
  }, [currentValue, dataName, formDataDispatch, globalStateDispatch, isEditing, validateData]);

  const clearSavedValue = useCallback(() => {
    formDataDispatch({ type: 'CLEAR_FORM_DATA', payload: [dataName] });
  }, [dataName, formDataDispatch]);

  // return object to the component
  const subscription: TSubscriptionReturn<TSavedValue> = {
    savedValue,
    hasSavedValue: isNotNull(savedValue),
    currentValue,
    hasCurrentValue: isNotNull(currentValue),
    error,
    hasError: !!error,
    set: (newValue: typeof currentValue) => {
      setCurrentValue(newValue);
      setError(null);
    },
    save,
    clearSavedValue,
    validate: validateData,
  };

  return subscription;
};

export default useFormDataSubscription;
