import { TValidationConfig } from 'helpers/validation/validation.types';
import { TFormDataState, TFormDataStateKey } from 'state/formDataState/types';
import { TSubscriptionReturn } from 'types/subscription';

export type TUseFormDataSubscription = <T extends TFormDataStateKey>(
  dataName: T,
  validationConfig?: TValidationConfig[],
) => TSubscriptionReturn<TFormDataState[T]>;
